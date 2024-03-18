using CommandLine;
using System;
using System.Runtime.InteropServices;

namespace SmartComparer.Tnr.Console
{
    public class Options
    {
        [Option('a', "analysis", Required = false, HelpText = "Analysis description.")]
        public string Analysis { get; set; } = "Non Regression Test";

        [Option('v', "valuationDate", Required = false, HelpText = "Valuation date in format yyyy-MM-dd.")]
        public string ValuationDateString { get; set; } = "2024-02-09";

        // This property is not directly used by CommandLineParser but is necessary for post-parsing processing
        public DateTime ValuationDate => DateTime.Parse(ValuationDateString);

        [Option('d', "deltaDiff", Required = false, HelpText = "Delta difference.")]
        public double DeltaDiff { get; set; } = 0.0;

        [Option("refDBResult", Required = false, HelpText = "Reference database result.")]
        public string RefDBResult { get; set; } = "DBRREF";

        [Option("refCluster", Required = false, HelpText = "Reference cluster.")]
        public string RefCluster { get; set; } = "PRM CARTOGRAPHY";

        [Option("refQlib", Required = false, HelpText = "Reference Qlib.")]
        public string RefQlib { get; set; } = "P3 APEX";

        [Option("refServer", Required = false, HelpText = "Reference server.")]
        public string RefServer { get; set; } = "gndpradev2.emea.cib";

        [Option("rcDBResult", Required = false, HelpText = "RC database result.")]
        public string RcDBResult { get; set; } = "DBRRC";

        [Option("rcCluster", Required = false, HelpText = "RC cluster.")]
        public string RcCluster { get; set; } = "Some Cluster";

        [Option("rcQlib", Required = false, HelpText = "RC Qlib.")]
        public string RcQlib { get; set; } = "GMDPRS_PS_LATEST";

        [Option("rcServer", Required = false, HelpText = "RC server.")]
        public string RcServer { get; set; } = "gmdprsint2.emea.cib";
    }

}
