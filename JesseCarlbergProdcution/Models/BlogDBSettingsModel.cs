using System;
using MongoDB.Driver;

namespace JesseCarlbergProdcution.Models
{
    public class BlogDBSettingsModel : IBlogDBSettingsModel
    {
        public string BlogCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public SslSettings? SslSettings { get; set; }
    }

    public interface IBlogDBSettingsModel
    {
        string BlogCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        SslSettings? SslSettings { get; set; }
    }
}