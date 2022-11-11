using System;
using Dapper;
using JesseCarlbergProdcution.Common;
using JesseCarlbergProdcution.Interfaces;
using JesseCarlbergProdcution.Models;
using Microsoft.Data.SqlClient;

namespace JesseCarlbergProdcution.Services
{
    public class GAAnalyticsService: IGAAnalyticsService
    {

        /// <summary>
        /// The configuration
        /// </summary>
        private readonly IConfiguration config;

        /// <summary>
        /// The i excel con string
        /// </summary>
        private readonly string azConString;

        private Helpers _helpers;

        /// <summary>
        /// Initializes a new instance of the <see cref="GoogleAnalyticsService"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GAAnalyticsService(IConfiguration settings)
        {
            this.config = settings;
            this.azConString = this.config.GetConnectionString("DefaultConnection");
            this._helpers = new();
        }

        /// <summary>
        /// Returns list of Google Analytics Data
        /// </summary>
        /// <param name="startDate">The start date.</param>
        /// <param name="endDate">The end date.</param>
        /// <returns>A Task&lt;List`1&gt; representing the asynchronous operation.</returns>
        public async Task<List<GAnalyticsResponse>> GetGoogleAnalyticsVisitorsAsync(DateTime startDate, DateTime endDate)
        {
            string sql = _helpers.GetSql("GAVisitors.sql");
            var parameters = new { StartDate = startDate, EndDate = endDate };
            using SqlConnection azdbConn = new(azConString);
            azdbConn.Open();
            var result = await azdbConn.QueryAsync<GAnalyticsResponse>(sql, parameters);
            return result.ToList();
        }
    }
}
