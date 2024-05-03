using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Customer
{
    public int CustomerId { get; set; }

    [Required]
    public string Name { get; set; }

    public string Email { get; set; }

    //public ICollection<Rental> Rentals { get; set; }
}
