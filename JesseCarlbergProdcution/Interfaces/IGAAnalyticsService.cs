using System;
using JesseCarlbergProdcution.Models;

namespace JesseCarlbergProdcution.Interfaces
{
    public interface IGAAnalyticsService
    {
        public Task<List<GAnalyticsResponse>> GetGoogleAnalyticsVisitorsAsync(DateTime startDate, DateTime endDate);
    }
}
