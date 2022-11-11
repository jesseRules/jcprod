using System;
using JesseCarlbergProdcution.Interfaces;
using JesseCarlbergProdcution.Models;
using JesseCarlbergProdcution.Services;
using Microsoft.AspNetCore.Mvc;

namespace JesseCarlbergProdcution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwitterController : ControllerBase
    {
        private readonly ITwitterService _twitterService;

        public TwitterController(ITwitterService twitterService)
        {
            _twitterService = twitterService;
        }

        /// <summary>
        /// Search Twitter by Keyword
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="tweetCount"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("searchRecent")]
        public async Task<TwitterModel.Rootobject> GetSearchRecentAsync(string keyword, int tweetCount)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            return await _twitterService.GetSearchAllAsync(keyword, tweetCount);
        }

        /// <summary>
        /// Search Twitter by Keyword For Display
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="tweetCount"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("search")]
        public async Task<TwitterModel.RootView> GetSearchRecentForDisplayAsync(string keyword, int tweetCount)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            return await _twitterService.GetSearchAllForDisplayAsync(keyword, tweetCount);
        }
    }
}