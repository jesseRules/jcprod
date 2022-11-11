using System;
using JesseCarlbergProdcution.Interfaces;
using JesseCarlbergProdcution.Models;
using JesseCarlbergProdcution.Services;
using Microsoft.AspNetCore.Mvc;

namespace JesseCarlbergProdcution.Controllers
{
    /// <summary>
    /// Class GoogleAnalyticsController.
    /// Implements the <see cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />

    [Route("api/[controller]")]
    [ApiController]
    public class GoogleAnalyticsController : ControllerBase
    {

        /// <summary>
        /// The GoogleAnalyticsService service
        /// </summary>
        private readonly IGAAnalyticsService _googleAnalyticsService;

        /// <summary>
        /// Initializes a new instance of the <see cref="GoogleAnalyticsController"/> class.
        /// </summary>
        /// <param name="googleAnalyticsService">The google analytics service.</param>
        public GoogleAnalyticsController(IGAAnalyticsService googleAnalyticsService)
        {
            _googleAnalyticsService = googleAnalyticsService;
        }

        /// <summary>
        /// Gets a List of GA Visitors by DateRange
        /// </summary>
        /// <returns>A list of ga visitor counts by date</returns>
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<GAnalyticsResponse>), 200)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet("Visitors", Name = "GetGoogleAnalyticsVisitors")]
        public async Task<IActionResult> GetGoogleAnalyticsVisitorsAsync(DateTime startDate, DateTime endDate)
        {
            List<GAnalyticsResponse> results = await _googleAnalyticsService.GetGoogleAnalyticsVisitorsAsync(startDate, endDate);
            return Ok(results);
        }
    }
}