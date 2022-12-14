using System;
using Microsoft.Extensions.Options;
using System.Text;
using JesseCarlbergProdcution.Models;
using Newtonsoft.Json;
using JesseCarlbergProdcution.Interfaces;

namespace JesseCarlbergProdcution.Services
{
    public class TwitterService: ITwitterService
    {
        public string AccessToken { get; set; }

        public TwitterConnectionSettings Options { get; set; }

        public TwitterService(IOptions<TwitterConnectionSettings> optionsAccessor)
        {
            Options = optionsAccessor.Value;
            AccessToken = GetAccessToken().GetAwaiter().GetResult();
        }

        //get token
        public async Task<string> GetAccessToken()
        {
            using (HttpClient httpClient = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.twitter.com/oauth2/token ");
                var customerInfo = Convert.ToBase64String(new UTF8Encoding()
                                            .GetBytes(Options.Key + ":" + Options.Secret));
                request.Headers.Add("Authorization", "Basic " + customerInfo);
                request.Content = new StringContent("grant_type=client_credentials",
                                                        Encoding.UTF8, "application/x-www-form-urlencoded");
                HttpResponseMessage response = await httpClient.SendAsync(request).ConfigureAwait(false);
                string json = await response.Content.ReadAsStringAsync();
                dynamic item = Newtonsoft.Json.JsonConvert.DeserializeObject<object>(json);
                return item["access_token"];
            }
        }

        //Search All Recent by Term
        public async Task<TwitterModel.Rootobject> GetSearchAllAsync(string term, int count)
        {
            var requestUserTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
            https://api.twitter.com/2/tweets/search/recent?max_results={0}&query={1}&media.fields=duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics&user.fields=description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text&expansions=author_id,in_reply_to_user_id,entities.mentions.username"
            , count, term));

            requestUserTimeline.Headers.Add("Authorization", "Bearer " + AccessToken);
            var httpClient = new HttpClient();
            HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestUserTimeline);
            string json = await responseUserTimeLine.Content.ReadAsStringAsync();

            TwitterModel.Rootobject response = JsonConvert.DeserializeObject<TwitterModel.Rootobject>(json);

            return response;
        }

        //Search All Recent by Term Combined User Info
        public async Task<TwitterModel.RootView> GetSearchAllForDisplayAsync(string term, int count)
        {
            var requestUserTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
            https://api.twitter.com/2/tweets/search/recent?max_results={0}&query={1}&media.fields=duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics&user.fields=description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text&expansions=author_id,in_reply_to_user_id,entities.mentions.username"
            , count, term));

            requestUserTimeline.Headers.Add("Authorization", "Bearer " + AccessToken);
            var httpClient = new HttpClient();
            HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestUserTimeline);
            string json = await responseUserTimeLine.Content.ReadAsStringAsync();

            TwitterModel.Rootobject response = JsonConvert.DeserializeObject<TwitterModel.Rootobject>(json);

            TwitterModel.RootView view = new TwitterModel.RootView();
            view.meta = response.meta;
            view.tweets = response.data;
            if (view.tweets != null)
            {
                foreach (TwitterModel.RootData tweet in view.tweets)
                {
                    tweet.user = response.includes.users.FirstOrDefault(x => x.id == tweet.author_id);
                }
            }
            return view;
        }
    }
}