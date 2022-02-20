using Domain.Schema;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

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
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<EventLog> EventLog { get; set; }

        protected virtual string DefaultSchema => "dbo";
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Queue>(entity =>
            {
                entity.HasKey(e => new { e.Id }).HasName("PK_Queue");

                entity.Property(e => e.Id).UseIdentityColumn();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.CreatedTime).IsRequired().HasDefaultValueSql("(getutcdate())");
            });
            modelBuilder.Entity<PhysicalQueue>(entity =>
            {
                entity.HasKey(e => new { e.Id }).HasName("PK_PhysicalQueue");

                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasIndex(e => e.QueueId, "IX_PhysicalQueues_QueueId");
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.CreatedTime).IsRequired().HasDefaultValueSql("(getutcdate())");
                entity.Property(e => e.EstimatedTime).IsRequired().HasDefaultValueSql("(getutcdate())");
                entity.HasOne(d => d.Queue).WithMany(q => q.PhysicalQueues).HasForeignKey(d => new { d.QueueId }).OnDelete(DeleteBehavior.Cascade).HasConstraintName("FK_PhysicalQueues_Queues");
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => new { e.Id }).HasName("PK_User");
                entity.HasIndex(e => e.Email, "IX_Users_Email").IsUnique();
                entity.HasIndex(e => e.QueueId, "IX_Users_QueueId");
                entity.HasIndex(e => e.UserRoleId, "IX_Users_UserRoleId");
                entity.HasIndex(e => e.PhysicalQueueId, "IX_Users_PhysicalQueueId");
                entity.Property(e => e.Password).HasColumnType("nvarchar(max)");
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(250);
                entity.Property(e => e.CreatedTime).IsRequired().HasDefaultValueSql("(getutcdate())");
                entity.Property(e => e.IsActive).IsRequired();
                entity.HasOne(d => d.Queue).WithMany(q => q.Users).HasForeignKey(d => new { d.QueueId }).OnDelete(DeleteBehavior.SetNull).HasConstraintName("FK_Users_Queues");
                entity.HasOne(d => d.PhysicalQueue).WithMany(q => q.Users).HasForeignKey(d => new { d.PhysicalQueueId }).OnDelete(DeleteBehavior.SetNull).HasConstraintName("FK_Users_PhysicalQueues");
                entity.HasOne(d => d.UserRole).WithMany(u => u.Users).OnDelete(DeleteBehavior.Cascade).HasForeignKey(d => new { d.UserRoleId }).HasConstraintName("FK_Users.UserRole");
                entity.HasOne(d=>d.UsersToQueues).WithOne(u=>u.User).HasForeignKey<UsersToQueues>(u => u.UserId).OnDelete(DeleteBehavior.NoAction).HasConstraintName("FK_User_UserToQueues");
            });
            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => new { e.Id }).HasName("PK_UserRole");
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            });
            modelBuilder.Entity<EventLog>(entity => {
                entity.HasKey(e => new { e.Id }).HasName("PK_EventLog");

                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasIndex(e => e.EventCategoryId, "IX_EventLog_EventCategory");
                entity.HasIndex(e => e.Timestamp, "IX_EventLog_Timestamp");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e=>e.Timestamp).IsRequired().HasDefaultValueSql("(getutcdate())");
                entity.HasOne(e => e.EventCategory).WithMany(e => e.EventLogs).HasForeignKey(e => new { e.EventCategoryId }).OnDelete(DeleteBehavior.Cascade).HasConstraintName("FK_EventLog_EventCategory");
            });

            modelBuilder.Entity<EventCategory>(entity=>{
                entity.HasKey(e => new { e.Id }).HasName("PK_EventCategory");
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            });
            modelBuilder.Entity<UsersToQueues>(entity => {
                entity.HasKey(e => new { e.Id }).HasName("PK_UsersToQueues");
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasIndex(e => e.PhysicalQueueId, "IX_UsersToQueues_PhysicalQueueId");
                entity.HasIndex(e => e.UserId, "IX_UsersToQueues_UserId");
                entity.Property(e => e.IsPassed).IsRequired().HasDefaultValue(0);
                entity.Property(e=>e.TimeAdded).IsRequired().HasDefaultValueSql("(getutcdate())");
                entity.Property(e => e.TimePassed).HasDefaultValueSql("('9999-12-31 23:59:59.99')");
                entity.HasOne(e => e.PhysicalQueue).WithMany(q => q.UsersToQueues).HasForeignKey(e=>new { e.PhysicalQueueId }).HasConstraintName("FK_UsersToQueues_PhysicalQueue");
                entity.HasOne(e => e.User).WithOne(u => u.UsersToQueues).HasForeignKey<User>(u => u.UsersToQueuesId).OnDelete(DeleteBehavior.Cascade).HasConstraintName("FK_UsersToQueues_User");
            });
        }
    }
}
