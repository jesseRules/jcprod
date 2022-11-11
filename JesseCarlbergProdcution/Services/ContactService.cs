using System;
using JesseCarlbergProdcution.Interfaces;
using JesseCarlbergProdcution.Models;
using MongoDB.Driver;
using System.Linq;
using System.Threading.Tasks;
using SendGrid.Helpers.Mail;
using System.Reflection.Metadata;
using System.Security.Authentication;

namespace JesseCarlbergProdcution.Services
{
    public class ContactService : IContactService
    {
        private readonly IMongoCollection<ContactModel> _contacts;

        /// <summary>
        /// The email sender
        /// </summary>
        private readonly IEmailService _emailSender;

        public ContactService(IContactDBSettingsModel settings, Interfaces.IEmailService emailSender)
        {
            settings.SslSettings =
  new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _contacts = database.GetCollection<ContactModel>(settings.ContactCollectionName);
            _emailSender = emailSender;
        }

        public ContactModel Get(string id) =>
        _contacts.Find<ContactModel>(contact => contact.Id == id).FirstOrDefault();

        
        public async Task<ContactModel> CreateAsync(ContactModel contact)
        {

            try
            {
                _contacts.InsertOne(contact);
            }
            catch (MongoWriteException e)
            {
                Console.WriteLine(e.Message);
            }

            EmailModel message = new()
            {
                Message = contact.email + " " + contact.name + " " + contact.message,
                HtmlMessage = contact.email + " " + contact.name + " " + contact.message,
                ToEmail = "jessecarlberg@gmail.com",
                Subject = "Jesse Carlberg Production Contact Req"
            };

            await _emailSender.SendEmailAsync(message);

            return contact;
        }
    }
}