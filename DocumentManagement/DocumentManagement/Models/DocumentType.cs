using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManagement.Models
{
    public class DocumentType
    {
        [Key]
        public int IdDocType { get; set; }
        public string Incoming { get; set; }
        public string Outgoing { get; set; }
        public virtual Document Document { get; set; }
        public int IdDocument { get; set; }
    }
}