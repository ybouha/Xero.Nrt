package com.xero.webapi.pipeline;

import com.xero.webapi.model.NrtRunRequest;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.function.Consumer;

/**
 * Stub bound at startup so the orchestrator and REST surface compile while the
 * comparator core is still on the .NET side. The .NET pipeline depends on three
 * proprietary libraries (Xero.SmartComparer, Xero.DataAcquisition,
 * Xero.ResultSaver) plus reflective dynamic-type emission against the column
 * schema — none of which have a Java port yet.
 *
 * <p>Replace with a real {@link NrtPipelineRunner} once those components ship
 * for the JVM.
 */
@Component
public class PlaceholderNrtPipelineRunner implements NrtPipelineRunner {

    @Override
    public PipelineCounts run(NrtRunRequest request,
                              int runId,
                              OffsetDateTime runTimestamp,
                              Consumer<String> onPhase) {
        throw new UnsupportedOperationException(
                "Comparator pipeline not yet ported to Java — needs equivalents of " +
                "Xero.SmartComparer / Xero.DataAcquisition / Xero.ResultSaver.");
    }
}
