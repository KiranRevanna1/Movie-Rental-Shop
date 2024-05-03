using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Movies
{
    [Key]
    public int MovieId { get; set; }

    [Required]
    public string Title { get; set; }

    public string Director { get; set; }

    public int Year { get; set; }

    // Other properties as needed
    //public ICollection<Rental> Rentals { get; set; }

}