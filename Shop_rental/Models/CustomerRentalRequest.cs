using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop_rental.Models
{
    public class CustomerRentalRequest
    {
        public int CustomerId { get; set; }
        public List<int> MovieIds { get; set; }
    }
}