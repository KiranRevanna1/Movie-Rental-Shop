using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

public class CustomersController : ApiController
{
    private readonly AppDbContext _dbContext = new AppDbContext();
    [EnableCors(origins: "*", headers: "*", methods:"*")]
    // GET: api/Customers
    public IQueryable<Customer> GetCustomers()
    {
        return _dbContext.Customers;
    }

    // GET: api/Customers/5
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ResponseType(typeof(Customer))]
    public async Task<IHttpActionResult> GetCustomer(int id)
    {
        Customer customer = await _dbContext.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound();
        }

        return Ok(customer);
    }

    // POST: api/Customers
    [ResponseType(typeof(Customer))]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public async Task<IHttpActionResult> PostCustomer(Customer customer)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _dbContext.Customers.Add(customer);
        await _dbContext.SaveChangesAsync();

        return CreatedAtRoute("DefaultApi", new { id = customer.CustomerId }, customer);
    }

    // PUT: api/Customers/5
    [ResponseType(typeof(void))]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public async Task<IHttpActionResult> PutCustomer(int id, Customer customer)
    
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        // Map the id field to CustomerId
        customer.CustomerId = id;

        if (id != customer.CustomerId)
        {
            return BadRequest();
        }

        // Retrieve the existing customer record from the database
        var existingCustomer = await _dbContext.Customers.FindAsync(id);
        if (existingCustomer == null)
        {
            return NotFound();
        }

        // Update only the properties that are edited
        if(customer.Name != null)
        {
            existingCustomer.Name = customer.Name;
        }
        if (customer.Email != null)
        {
            existingCustomer.Email = customer.Email;
        }


        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CustomerExists(id))
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


    // DELETE: api/Customers/5
    [ResponseType(typeof(Customer))]
    public async Task<IHttpActionResult> DeleteCustomer(int id)
    {
        Customer customer = await _dbContext.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound();
        }

        _dbContext.Customers.Remove(customer);
        await _dbContext.SaveChangesAsync();

        return Ok(customer);
    }

    private bool CustomerExists(int id)
    {
        return _dbContext.Customers.Any(e => e.CustomerId == id);
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
