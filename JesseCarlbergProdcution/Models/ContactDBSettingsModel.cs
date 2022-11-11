using System;
using MongoDB.Driver;

namespace JesseCarlbergProdcution.Models
{
    public class ContactDBSettingsModel : IContactDBSettingsModel
    {
        public string ContactCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public SslSettings SslSettings { get; set; }
    }

    public interface IContactDBSettingsModel
    {
        string ContactCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        SslSettings SslSettings { get; set; }
    }
}