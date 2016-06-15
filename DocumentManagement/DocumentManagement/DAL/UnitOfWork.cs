using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DocumentManagement.Models;


namespace DocumentManagement.DAL
{
    public class UnitOfWork : IDisposable
    {
        private ContextDB m_context = null;
        private Repository<Department> department;
        private Repository<Employee> employee;     
        private Repository<Company> company;
        private Repository<Document> document;
        private Repository<EmployeeDocument> employeeDocument;
        private Repository<User> user;     

        public UnitOfWork()
        {
            m_context = new ContextDB();
        }

        public Repository<Company> Company
        {
            get
            {
                if (company == null)
                {
                    company = new Repository<Company>(m_context);
                }
                return company;
            }
        }
        public Repository<Department> Department
        {
            get
            {
                if (department == null)
                {
                    department = new Repository<Department>(m_context);
                }
                return department;
            }
        }

        public Repository<Employee> Employee
        {
            get
            {
                if (employee == null)
                {
                    employee = new Repository<Employee>(m_context);
                }
                return employee;
            }
        }

        public Repository<Document> Document
        {
            get
            {
                if (document == null)
                {
                    document = new Repository<Document>(m_context);
                }
                return document;
            }
        }

        public Repository<EmployeeDocument> EmployeeDocument
        {
            get
            {
                if (employeeDocument == null)
                {
                    employeeDocument = new Repository<EmployeeDocument>(m_context);
                }
                return employeeDocument;
            }
        }

        public Repository<User> User
        {
            get
            {
                if (user == null)
                {
                    user = new Repository<User>(m_context);
                }
                return user;
            }
        }

        public async Task<string> SaveChange()
        {
            await m_context.SaveChangesAsync();
            return "Added successfully!";
        }

        bool disposed = true;
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;
            if (disposing)
            {
                m_context.Dispose();
            }

            disposed = true;
        }
        ~UnitOfWork()
        {
            Dispose(false);
        }


    }
}