using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

public class MoviesController : ApiController
{
    private readonly AppDbContext _dbContext = new AppDbContext();

    // GET: api/Movies
    public IQueryable<Movies> GetMovies()
    {
        return _dbContext.Movies;
    }

    // GET: api/Movies/5
    [ResponseType(typeof(Movies))]
    public async Task<IHttpActionResult> GetMovie(int id)
    {
        Movies movie = await _dbContext.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    // POST: api/Movies
    [ResponseType(typeof(Movies))]
    public async Task<IHttpActionResult> PostMovie(Movies movie)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _dbContext.Movies.Add(movie);
        await _dbContext.SaveChangesAsync();

        return CreatedAtRoute("DefaultApi", new { id = movie.MovieId }, movie);
    }

    // PUT: api/Movies/5
    [ResponseType(typeof(void))]
    public async Task<IHttpActionResult> PutMovie(int id, Movies movie)
    {
        /*if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }*/
        movie.MovieId = id;

        if (id != movie.MovieId)
        {
            return BadRequest();
        }

        // Retrieve the existing customer record from the database
        var existingMovie = await _dbContext.Movies.FindAsync(id);
        if (existingMovie == null)
        {
            return NotFound();
        }

        if (movie.Title != null)
        {
            existingMovie.Title = movie.Title;
        }
        if (movie.Director != null)
        {
            existingMovie.Director = movie.Director;
        }
        if (movie.Year != 0)
        {
            existingMovie.Year = movie.Year;
        }

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MovieExists(id))
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

    // DELETE: api/Movies/5
    [ResponseType(typeof(Movies))]
    public async Task<IHttpActionResult> DeleteMovie(int id)
    {
        Movies movie = await _dbContext.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound();
        }

        _dbContext.Movies.Remove(movie);
        await _dbContext.SaveChangesAsync();

        return Ok(movie);
    }

    private bool MovieExists(int id)
    {
        return _dbContext.Movies.Any(e => e.MovieId == id);
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
