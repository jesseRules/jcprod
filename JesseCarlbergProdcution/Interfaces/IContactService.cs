using System;
using JesseCarlbergProdcution.Models;

namespace JesseCarlbergProdcution.Interfaces
{
    public interface IContactService
    {
        public ContactModel Get(string id);
        public Task<ContactModel> CreateAsync(ContactModel contact);
    }
}
