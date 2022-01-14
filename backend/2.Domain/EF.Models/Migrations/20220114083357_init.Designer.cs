﻿// <auto-generated />
using System;
using EF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EF.Models.Migrations
{
    [DbContext(typeof(QueueManagerContext))]
    [Migration("20220114083357_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Schema.EventCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EventCategory");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Success"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Error"
                        });
                });

            modelBuilder.Entity("Domain.Schema.EventLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("EventCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.HasKey("Id");

                    b.HasIndex("EventCategoryId");

                    b.ToTable("EventLog");
                });

            modelBuilder.Entity("Domain.Schema.PhysicalQueue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("EstimatedTime")
                        .HasColumnType("time");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("QueueId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QueueId");

                    b.ToTable("PhysicalQueues");
                });

            modelBuilder.Entity("Domain.Schema.Queue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Queues");
                });

            modelBuilder.Entity("Domain.Schema.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PhysicalQueueId")
                        .HasColumnType("int");

                    b.Property<int?>("QueueId")
                        .HasColumnType("int");

                    b.Property<int?>("UserRoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasFilter("[Email] IS NOT NULL");

                    b.HasIndex("PhysicalQueueId");

                    b.HasIndex("QueueId");

                    b.HasIndex("UserRoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Schema.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UserRole");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Admin"
                        },
                        new
                        {
                            Id = 2,
                            Name = "User"
                        });
                });

            modelBuilder.Entity("Domain.Schema.UsersToQueues", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsPassed")
                        .HasColumnType("bit");

                    b.Property<int?>("PhysicalQueueId")
                        .HasColumnType("int");

                    b.Property<int?>("QueueId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TimeAdded")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TimePassed")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PhysicalQueueId");

                    b.HasIndex("QueueId");

                    b.HasIndex("UserId");

                    b.ToTable("UsersToQueues");
                });

            modelBuilder.Entity("Domain.Schema.EventLog", b =>
                {
                    b.HasOne("Domain.Schema.EventCategory", "EventCategory")
                        .WithMany()
                        .HasForeignKey("EventCategoryId");

                    b.Navigation("EventCategory");
                });

            modelBuilder.Entity("Domain.Schema.PhysicalQueue", b =>
                {
                    b.HasOne("Domain.Schema.Queue", "Queue")
                        .WithMany()
                        .HasForeignKey("QueueId");

                    b.Navigation("Queue");
                });

            modelBuilder.Entity("Domain.Schema.User", b =>
                {
                    b.HasOne("Domain.Schema.PhysicalQueue", "PhysicalQueue")
                        .WithMany()
                        .HasForeignKey("PhysicalQueueId");

                    b.HasOne("Domain.Schema.Queue", "Queue")
                        .WithMany()
                        .HasForeignKey("QueueId");

                    b.HasOne("Domain.Schema.UserRole", "UserRole")
                        .WithMany()
                        .HasForeignKey("UserRoleId");

                    b.Navigation("PhysicalQueue");

                    b.Navigation("Queue");

                    b.Navigation("UserRole");
                });

            modelBuilder.Entity("Domain.Schema.UsersToQueues", b =>
                {
                    b.HasOne("Domain.Schema.PhysicalQueue", "PhysicalQueue")
                        .WithMany()
                        .HasForeignKey("PhysicalQueueId");

                    b.HasOne("Domain.Schema.Queue", "Queue")
                        .WithMany()
                        .HasForeignKey("QueueId");

                    b.HasOne("Domain.Schema.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("PhysicalQueue");

                    b.Navigation("Queue");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
