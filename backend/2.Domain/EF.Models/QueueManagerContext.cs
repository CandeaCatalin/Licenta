using Domain.Schema;
using Microsoft.EntityFrameworkCore;

namespace EF.Models
{
    public class QueueManagerContext : DbContext
    {

            public QueueManagerContext(DbContextOptions<QueueManagerContext> options) : base(options)
            {

            }
            public DbSet<User> Users { get; set; }
            public DbSet<Queue> Queues { get; set; }
            public DbSet<QueueToUserCreated> QueueToUsersCreated { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Queue>()
                    .Property(d => d.CreatedTime)
                    .HasDefaultValueSql("getdate()");
                modelBuilder.Entity<User>()
                    .Property(u => u.CreatedTime)
                    .HasDefaultValueSql("getdate()");
                modelBuilder.Entity<User>(e => { e.HasIndex(e => e.Email).IsUnique(); });
            }

    }
}
