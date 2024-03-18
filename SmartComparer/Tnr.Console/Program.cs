using CommandLine;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using System.Text;

namespace SmartComparer.Tnr.Console
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args)
                .WithParsed<Options>(opts =>
                {
                    // Creating and populating the Tnr object using the parsed options
                    var tnr = new Tnr
                    {
                        Analysis = opts.Analysis,
                        ValuationDate = opts.ValuationDate, // This uses the computed property for DateTime
                        DeltaDiff = opts.DeltaDiff,
                        RefDBResult = opts.RefDBResult,
                        RefCluster = opts.RefCluster,
                        RefQlib = opts.RefQlib,
                        RefServer = opts.RefServer,
                        RcDBResult = opts.RcDBResult,
                        RcCluster = opts.RcCluster,
                        RcQlib = opts.RcQlib,
                        RcServer = opts.RcServer,
                    };


                    try
                    {
                        // Launch both pricing requests simultaneously
                        var pricingTasks = new[]
                        {
                            RequestPricingAsync(tnr.RefServer, tnr),
                            RequestPricingAsync(tnr.RcServer, tnr)
                        };

                        // Wait for all pricing requests to complete
                        var results = await Task.WhenAll(pricingTasks);

                        // At this point, results[0] is the jobId from the RefServer, and results[1] is the jobId from the RcServer
                        var jobIdRef = results[0];
                        var jobIdRc = results[1];

                        // Proceed with the rest of your workflow
                        var comparisonResult = await CompareResultsAsync(jobIdRef, jobIdRc, tnr);
                        var excelReportPath = await GenerateExcelReportAsync(comparisonResult);
                        var htmlReportContent = await GenerateHtmlReportAsync(comparisonResult);
                        await SendEmailAsync(htmlReportContent, excelReportPath);

                        Console.WriteLine("Workflow completed successfully.");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error: {ex.Message}");
                        // Log the error
                        LogError(ex);
                    }

                })
                .WithNotParsed<Options>(errs =>
                {
                    // Handle errors
                    Console.WriteLine("Error parsing arguments");
                    foreach (var err in errs)
                    {
                        Console.WriteLine(err);
                    }
                });
        }


        static readonly HttpClient httpClient = new HttpClient { Timeout = TimeSpan.FromDays(1) }; // Setting the timeout to one day

        static async Task<string> RequestPricingAsync(string server, Tnr tnr)
        {
            var url = $"https://{server}/api/price";
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();

            try
            {
                Console.WriteLine($"Hitting URL: {url}"); // Logging the URL being hit

                var json = JsonConvert.SerializeObject(tnr);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await httpClient.PostAsync(url, content);

                response.EnsureSuccessStatusCode();

                var responseBody = await response.Content.ReadAsStringAsync();
                stopwatch.Stop();

                Console.WriteLine($"URL: {url} responded in {stopwatch.ElapsedMilliseconds} ms"); // Logging elapsed time

                return responseBody; // Adjust according to the actual response format
            }
            catch (HttpRequestException e)
            {
                stopwatch.Stop();
                Console.WriteLine($"\nException Caught! Message: {e.Message} ");
                Console.WriteLine($"Failed URL: {url}");
                Console.WriteLine($"Elapsed Time: {stopwatch.ElapsedMilliseconds} ms"); // Logging elapsed time on error
                throw; // Re-throwing the exception to be handled by the caller
            }
            catch (TaskCanceledException e)
            {
                stopwatch.Stop();
                // This exception is thrown when the request times out
                Console.WriteLine($"Request to URL: {url} timed out. Elapsed Time: {stopwatch.ElapsedMilliseconds} ms");
                throw; // You might want to handle this specifically
            }
        }

        static async Task<ComparisonResult> CompareResultsAsync(string jobIdRef, string jobIdRc, Tnr tnr)
        {
            // Stub: Implement the actual comparison logic here
            return new ComparisonResult(); // Placeholder return
        }

        static async Task<string> GenerateExcelReportAsync(ComparisonResult comparisonResult)
        {
            // Stub: Implement actual Excel report generation here
            return "path/to/excel/report.xlsx"; // Placeholder return
        }

        static async Task<string> GenerateHtmlReportAsync(ComparisonResult comparisonResult)
        {
            // Stub: Implement actual HTML report generation here
            return "<html>Report Content</html>"; // Placeholder return
        }


        //{
        //    "EmailSettings": {
        //        "SmtpServer": "smtp.example.com",
        //        "SmtpPort": 587,
        //        "SmtpUsername": "your_username",
        //        "SmtpPassword": "your_password",
        //        "FromEmail": "from@example.com",
        //        "ToEmail": "to@example.com",
        //        "UseSSL": true
        //    }
        //}

        //Install-Package Microsoft.Extensions.Configuration
        //Install-Package Microsoft.Extensions.Configuration.Json

        static async Task SendEmailAsync(string htmlContent, string attachmentPath)
        {
            // Build configuration
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            IConfigurationRoot configuration = builder.Build();

            // Get email settings from configuration
            var emailSettings = configuration.GetSection("EmailSettings");
            var smtpServer = emailSettings["SmtpServer"];
            var smtpPort = int.Parse(emailSettings["SmtpPort"]);
            var smtpUsername = emailSettings["SmtpUsername"];
            var smtpPassword = emailSettings["SmtpPassword"];
            var fromEmail = emailSettings["FromEmail"];
            var toEmail = emailSettings["ToEmail"];
            var useSSL = bool.Parse(emailSettings["UseSSL"]);

            using (var client = new SmtpClient(smtpServer, smtpPort))
            {
                client.EnableSsl = useSSL;
                client.Credentials = new System.Net.NetworkCredential(smtpUsername, smtpPassword);

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = "Your Email Subject Here",
                    Body = htmlContent,
                    IsBodyHtml = true
                };
                mailMessage.To.Add(toEmail);

                if (!string.IsNullOrWhiteSpace(attachmentPath))
                {
                    var attachment = new Attachment(attachmentPath);
                    mailMessage.Attachments.Add(attachment);
                }

                try
                {
                    await client.SendMailAsync(mailMessage);
                    Console.WriteLine("Email sent successfully.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to send email. Error: {ex.Message}");
                    throw;
                }
            }
        }


        static void LogError(Exception ex)
        {
            // Stub: Implement actual logging logic here
            Console.WriteLine($"Logged Error: {ex.Message}");
        }
    }


    public class Tnr
    {
        public string Analysis { get; set; }
        public DateTime ValuationDate { get; set; }
        public double DeltaDiff { get; set; }
        public string RefDBResult { get; set; }
        public string RefCluster { get; set; }
        public string RefQlib { get; set; }
        public string RefServer { get; set; }
        public string RcDBResult { get; set; }
        public string RcCluster { get; set; }
        public string RcQlib { get; set; }
        public string RcServer { get; set; }
    }
}
