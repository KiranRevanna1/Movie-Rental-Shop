using System.Data.Entity;

public class AppDbContext : DbContext
{
    public AppDbContext() : base("name=blrkiranw11\\sql2019.Rental_DB.dbo")
    {
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Movies> Movies { get; set; }
    public DbSet<Rental> Rentals { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        // Configure relationships
        modelBuilder.Entity<Rental>()
            .HasRequired(r => r.Customer)
            .WithMany()
            .HasForeignKey(r => r.CustomerId);

        modelBuilder.Entity<Rental>()
            .HasRequired(r => r.Movie)
            .WithMany()
            .HasForeignKey(r => r.MovieId);

        base.OnModelCreating(modelBuilder);
    }
}
