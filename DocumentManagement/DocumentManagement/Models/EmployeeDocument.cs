using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManagement.Models
{
    public class EmployeeDocument
    {
        [Key, Column(Order = 0)]
        public int IdEmployee { get; set; }
        [Key, Column(Order = 1)]
        public int IdDocument { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Document Document { get; set; }
    }  
}