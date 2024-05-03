using System;

public class Rental
{
    public int RentalId { get; set; }  
    public int CustomerId { get; set; }
    public int MovieId { get; set; }
    public DateTime RentalDate { get; set; }
    public DateTime? ReturnDate { get; set; }

    // Navigation properties
    public virtual Customer Customer { get; set; }
    public virtual Movies Movie { get; set; }
}
