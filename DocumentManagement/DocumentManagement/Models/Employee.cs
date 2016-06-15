using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManagement.Models
{
    public class Employee
    {
        
       [Key]
        public int IdEmployee { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Employee DepartmentHead { get; set; }
        public Employee ManagerCompany { get; set; }
        public virtual Department Department { get; set; }
        public int IdDepartment { get; set; }    
        public int UserId { get; set; }
        public virtual User User { get; set; }
       
    }
}