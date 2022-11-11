using System;
using JesseCarlbergProdcution.Models;

namespace JesseCarlbergProdcution.Interfaces
{
    public interface ISubscriptionsService
    {
        public SubscriptionModel Get(string id);
        public SubscriptionModel Create(SubscriptionModel subscription);
    }
}