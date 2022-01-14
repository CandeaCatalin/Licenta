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
        public DbSet<PhysicalQueue> PhysicalQueues { get; set; }
        public DbSet<UsersToQueues> UsersToQueues { get; set; }
        public DbSet<EventLog> EventLog { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Queue>()
                .Property(d => d.CreatedTime)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<PhysicalQueue>()
                .Property(e => e.CreatedTime)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<EventLog>()
                .Property(e => e.Timestamp)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<User>()
                .Property(u => u.CreatedTime)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<User>(e => { e.HasIndex(e => e.Email).IsUnique(); });
            modelBuilder.Entity<EventCategory>().HasData(new EventCategory
                {
                    Id = 1,
                    Name = "Success"
                },
                new EventCategory
                {
                    Id = 2,
                    Name = "Error"
                });
            modelBuilder.Entity<UserRole>()
                .HasData(new UserRole { Id = 1, Name = "Admin" }, new UserRole { Id = 2, Name = "User" });
        }
    }
}
