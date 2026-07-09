package com.xero.webapi.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * Executes shell commands via the platform-native shell — {@code cmd.exe /c} on
 * Windows and {@code /bin/bash -c} elsewhere.
 *
 * <p>The contract mirrors the .NET {@code ICommandRunner}: the call <b>never throws</b>;
 * non-zero exit codes and IO failures are captured into the returned {@link CommandResult}
 * so the orchestrator can persist the per-side outcome before deciding whether to abort.
 *
 * <p>Wrapped with Resilience4j {@code @Retry("shellCommand")} for transient {@link IOException}s
 * raised while spawning the process, and a {@code @CircuitBreaker("shellCommand")} so a
 * misconfigured command line cannot hammer the host.
 */
@Component
public class CommandRunner {

    private static final Logger log = LoggerFactory.getLogger(CommandRunner.class);

    @Retry(name = "shellCommand")
    @CircuitBreaker(name = "shellCommand")
    public CommandResult run(String commandLine) {
        log.info("Executing command: {}", commandLine);

        boolean isWindows = System.getProperty("os.name", "")
                .toLowerCase(Locale.ROOT).startsWith("windows");
        String shell = isWindows ? "cmd.exe"   : "/bin/bash";
        String flag  = isWindows ? "/c"        : "-c";

        var pb = new ProcessBuilder(shell, flag, commandLine);
        pb.redirectErrorStream(false);

        Process process;
        try {
            process = pb.start();
        } catch (IOException ex) {
            // Wrapped so the @Retry interceptor (configured against UncheckedIOException) can match it.
            throw new UncheckedIOException(ex);
        }

        // Drain stdout / stderr concurrently so neither pipe can block the child.
        var stdoutFuture = drainAsync(process.getInputStream());
        var stderrFuture = drainAsync(process.getErrorStream());

        try {
            int exitCode = process.waitFor();
            String stdout = stdoutFuture.get();
            String stderr = stderrFuture.get();

            if (exitCode == 0) {
                log.info("Command succeeded (exit 0): {}", commandLine);
            } else {
                log.warn("Command exited with code {}: {}\nStderr: {}",
                        exitCode, commandLine, stderr);
            }
            return new CommandResult(exitCode, stdout, stderr);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            process.destroyForcibly();
            log.warn("Command interrupted: {}", commandLine);
            return new CommandResult(-1, "", "Command was interrupted.");
        } catch (ExecutionException ex) {
            log.error("Failed reading command streams: {}", commandLine, ex);
            return new CommandResult(-1, "", ex.getCause() == null
                    ? ex.getMessage()
                    : ex.getCause().getMessage());
        }
    }

    private static CompletableFuture<String> drainAsync(InputStream in) {
        return CompletableFuture.supplyAsync(() -> {
            var sb = new StringBuilder();
            try (var reader = new BufferedReader(
                    new InputStreamReader(in, StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line).append(System.lineSeparator());
                }
            } catch (IOException ex) {
                log.debug("Stream drain ended with IOException: {}", ex.getMessage());
            }
            return sb.toString();
        });
    }

    /** Outcome of a single shell command execution. */
    public record CommandResult(int exitCode, String stdout, String stderr) {
        public boolean succeeded() { return exitCode == 0; }
    }
}
