using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManagement.Models
{
    public class Company
    {
        [Key]
        public int IdCompany { get; set; }
        public string NameCompany { get; set; }
        public virtual ICollection<Department> Department { get; set; }
    }
}