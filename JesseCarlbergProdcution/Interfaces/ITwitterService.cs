using System;
using JesseCarlbergProdcution.Models;

namespace JesseCarlbergProdcution.Interfaces
{
    public interface ITwitterService
    {
        public Task<string> GetAccessToken();

        public Task<TwitterModel.Rootobject> GetSearchAllAsync(string term, int count);

        public Task<TwitterModel.RootView> GetSearchAllForDisplayAsync(string term, int count);
    }
}