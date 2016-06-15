using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DocumentManagement.Models
{
    public class ContextDB:DbContext
    {
        public ContextDB()
            :base("Documents")
        {
           //  Database.SetInitializer<ContextDB>(new Initialize());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeDocument> EmployeeDocuments { get; set; }
        public DbSet<Document> Documents { get; set; }
       


       protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Employee>()
                   .HasKey(p=>p.IdEmployee)  
                   .Property(p=>p.IdEmployee)
                   .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                   .IsRequired();
            modelBuilder.Entity<Employee>()
                   .Property(p=>p.LastName)
                   .IsRequired();
            modelBuilder.Entity<Employee>()
                   .HasOptional(p=>p.DepartmentHead).WithMany()
                   .Map(p=>p.MapKey("DepartmentHeadId"));


         modelBuilder.Entity<Employee>()
        .HasKey(p => p.IdEmployee)
        .Property(p => p.IdEmployee)
        .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
        .IsRequired();
        modelBuilder.Entity<Employee>()
        .Property(p => p.LastName)
        .IsRequired();
        modelBuilder.Entity<Employee>()
        .HasOptional(p => p.ManagerCompany).WithMany()
         .Map(p => p.MapKey("ManagerCompanyId"));

        base.OnModelCreating(modelBuilder);
        }
    }
}

