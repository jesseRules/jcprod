using System;
using JesseCarlbergProdcution.Interfaces;
using JesseCarlbergProdcution.Models;
using JesseCarlbergProdcution.Services;
using Microsoft.AspNetCore.Mvc;

namespace JesseCarlbergProdcution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Gets a Contact Entry by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:length(24)}", Name = "GetContact")]
        public ActionResult<ContactModel> Get(string id)
        {
            var contact = _contactService.Get(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        /// <summary>
        /// Add a Conact Entry (set id to null)
        /// </summary>
        /// <remarks>Uses a MongoDB hosted on Azure</remarks>
        /// <param name="contact"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<ContactModel> Create(ContactModel contact)
        {
            try
            {
                var a = _contactService.CreateAsync(contact).GetAwaiter().GetResult();
            } catch (Exception ex)
            {
                Console.Write(ex);
            }

            return CreatedAtRoute("GetContact", new { id = contact.Id.ToString() }, contact);
        }
    }
}