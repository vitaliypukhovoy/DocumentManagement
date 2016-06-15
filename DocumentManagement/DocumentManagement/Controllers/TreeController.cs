using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DocumentManagement.DAL;
using DocumentManagement.Models;
//using System.Xml;

namespace DocumentManagement.Controllers
{
    public class TreeController : ApiController
    {
        ContextDB db = new ContextDB();
        
        public IEnumerable<Department> GetTree()
        {
            db.Configuration.ProxyCreationEnabled = false;


            var tree = db.Departments.Select(i => new
            {
                Iddepart = i.IdDepartment,
                depart = i.DepartmentName,
                empl = i.Employee.Select(im => new
                {   
                    empId =   im.IdEmployee,
                    depId  = im.IdDepartment,
                    emplName = im.LastName
                })
            })
            .AsEnumerable()
            .Select(d => new Department
            {
                DepartmentName = d.depart,
                IdDepartment   = d.Iddepart,
                Employee = d.empl.Select(e => new Employee
               {
                   IdEmployee = e.empId,
                 //  IdDepartment = e.depId,
                   LastName = e.emplName
               }).ToList()
            }).ToList();            
                         
            return tree ;
        }

    }
  
}
