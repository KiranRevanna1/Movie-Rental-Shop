using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http.Description;
using System.Web.Http;
using Shop_rental.Models;
using System;
using System.Web.Http.Cors;

public class RentalsController : ApiController
{
    private readonly AppDbContext _dbContext = new AppDbContext();

    // GET: api/Rentals
    [ResponseType(typeof(IEnumerable<RentalDto>))]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public async Task<IHttpActionResult> GetRentals()
    {
        var rentals = await _dbContext.Rentals
            .Include(r => r.Customer) // Include Customer navigation property
            .Include(r => r.Movie) // Include Movie navigation property
            .Select(r => new RentalDto
            {
                RentalId = r.RentalId,
                RentalDate = r.RentalDate,
                ReturnDate = r.ReturnDate,
                CustomerName = r.Customer.Name, // Get customer name via navigation property
                MovieTitle = r.Movie.Title // Get movie title via navigation property
            })
            .ToListAsync();

        return Ok(rentals);
    }




    // POST: api/Rentals
    [ResponseType(typeof(IEnumerable<Rental>))]
    public async Task<IHttpActionResult> PostRentals(CustomerRentalRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var customerId = request.CustomerId;
        var movieIds = request.MovieIds;

        foreach (var movieId in movieIds)
        {
            // Check if the movie is already rented
            var isMovieRented = await _dbContext.Rentals
                .AnyAsync(r => r.MovieId == movieId && r.ReturnDate == null);

            if (isMovieRented)
            {
                // Movie is already rented, return error response
                return BadRequest($"Movie with ID {movieId} is already rented.");
            }

            // Create a new rental record
            var rental = new Rental
            {
                CustomerId = customerId,
                MovieId = movieId,
                RentalDate = DateTime.Now,
                ReturnDate = null
            };

            _dbContext.Rentals.Add(rental);
        }

        await _dbContext.SaveChangesAsync();

        return CreatedAtRoute("DefaultApi", new { }, _dbContext.Rentals.Where(r => r.CustomerId == customerId));
    }


    // GET: api/Rentals?customerId=5
    public IQueryable<Rental> GetRentals(int customerId)
    {
        return _dbContext.Rentals.Where(r => r.CustomerId == customerId);
    }

    // GET: api/Rentals/5
    [ResponseType(typeof(Rental))]
    public async Task<IHttpActionResult> GetRental(int id)
    {
        Rental rental = await _dbContext.Rentals.FindAsync(id);
        if (rental == null)
        {
            return NotFound();
        }

        return Ok(rental);
    }

    // PUT: api/Rentals/5
    [ResponseType(typeof(void))]
    public async Task<IHttpActionResult> PutRental(int id, Rental rental)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (id != rental.RentalId)
        {
            return BadRequest();
        }

        _dbContext.Entry(rental).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RentalExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return StatusCode(HttpStatusCode.NoContent);
    }

    // DELETE: api/Rentals/5
    [ResponseType(typeof(Rental))]
    public async Task<IHttpActionResult> DeleteRental(int id)
    {
        Rental rental = await _dbContext.Rentals.FindAsync(id);
        if (rental == null)
        {
            return NotFound();
        }

        _dbContext.Rentals.Remove(rental);
        await _dbContext.SaveChangesAsync();

        return Ok(rental);
    }

    private bool RentalExists(int id)
    {
        return _dbContext.Rentals.Any(e => e.RentalId == id);
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            _dbContext.Dispose();
        }
        base.Dispose(disposing);
    }
}
