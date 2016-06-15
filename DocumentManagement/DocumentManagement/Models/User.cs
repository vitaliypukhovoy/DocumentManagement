using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManagement.Models
{
    public class User        
    {
        public User() {}

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserName { get; set; }     
     //   public int? EmployeeId { get; set; } 
     //   public virtual Employee Employee { get; set; }
    }
}