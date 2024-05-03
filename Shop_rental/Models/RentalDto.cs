using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop_rental.Models
{
    public class RentalDto
    {
        public int RentalId { get; set; }
        public string CustomerName { get; set; }
        public string MovieTitle { get; set; }
        public DateTime RentalDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        
    }


}