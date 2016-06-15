using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManagement.Models
{
    public class Department
    {
        [Key]
        public int IdDepartment { get; set; }
        public string DepartmentName { get; set; }
        public virtual ICollection<Employee> Employee { get; set; }
        public virtual Company Company { get; set; }
        public int IdCompany { get; set; }
    }
}