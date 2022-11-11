using System;
using System.Reflection;

namespace JesseCarlbergProdcution.Common
{
    /// <summary>
    /// Class Helpers.
    /// </summary>
    public class Helpers
    {

        /// <summary>
        /// Gets the SQL.
        /// </summary>
        /// <param name="filename">The filename.</param>
        /// <returns>System.String.</returns>
        public string GetSql(string filename)
        {
            string commandText;
            Assembly thisAssembly = Assembly.GetExecutingAssembly();
            using (Stream s = thisAssembly.GetManifestResourceStream(
                  "JesseCarlbergProduction.SQL." + filename))
            {
                using StreamReader sr = new(s);
                commandText = sr.ReadToEnd();
            }

            return commandText;
        }
    }

}