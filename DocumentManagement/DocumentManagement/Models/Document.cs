using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentManagement.Models
{
    public class Document
    {
        [Key]
        public int IdDocument { get; set; }
        public string DocName { get; set; }
        public string Autor { get; set; }
        public DateTime DocData { get; set; }
        public int DocCipher { get; set; }
        public string Department { get; set; }
        public string Company { get; set; }
        public string ReferOnHard { get; set; }
        public virtual ICollection<DocumentType> DocumentType { get; set; }
    }
}