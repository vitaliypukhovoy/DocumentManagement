using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using WebMatrix.Data;
using WebMatrix.WebData;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using Microsoft.Web.WebPages;
using DocumentManagement.DAL;
using DocumentManagement.Models;
using System.Text.RegularExpressions;


namespace DocumentManagement.Controllers
{    
    [Authorize]
    public class EmployeeController : Controller
    {
        ContextDB db = new ContextDB();      
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetDocument(int id)
        {
           var Iddoc = db.EmployeeDocuments.Where(i => i.IdEmployee == id).Select(i=>i.IdDocument).ToList();
           var docs = db.Documents.Where(i => Iddoc.Contains(i.IdDocument)).ToList();
           return Json(docs, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetTree()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var tree = db.Departments.Select(i => new
            {
                id =   i.IdDepartment+100,
                text = i.DepartmentName,
                item = i.Employee.Select(im => new
                {
                    id = im.IdEmployee,
                    text = im.LastName
                })
            });

            return Json(tree, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Upload(HttpPostedFileBase file)
        {
            string fileName = Guid.NewGuid().ToString();
            if (file != null)
            {
                string extension = Path.GetExtension(file.FileName);
                fileName += extension;
                List<string> ext = new List<string>() { ".doc", ".docx", ".pdf", ".xls", ".xlsx", ".png", ".jpg","jpeg",".rtf",".ppt",".pptx" };

                if (ext.Contains(extension))
                {
                    file.SaveAs(Server.MapPath(@"/App_Data/Upload/" + fileName));
                    db.Documents.Add(new Document { ReferOnHard = fileName, Autor = "Kuzmenko", DocCipher = 333909133, DocName = "VeryNeedDoc", DocData = DateTime.Now });
                    db.SaveChanges();
                    Document document = db.Documents.ToList().Last();
                    GetEmployeeDocument(document);
                    return Content("File loaded");
                }
            }
            return Redirect("Index");
        }


        public async void GetEmployeeDocument(Document document)
        {
            string currentUser = WebSecurity.CurrentUserName;
            using (UnitOfWork db = new UnitOfWork())
            {
                int userId = db.User.Get(i => i.UserName == currentUser).Id;
                Employee emp = await db.Employee.Get(i => i.IdEmployee == userId);
                var employeeDocument = new EmployeeDocument { Employee = emp, Document = document };
                db.EmployeeDocument.Add(employeeDocument);
                db.SaveChange();
            }                
        }
        public ActionResult GetDocumentId(int id)
        {
            string doc = db.Documents.Where(i => i.IdDocument == id).SingleOrDefault().ReferOnHard;
            var fileName = Server.MapPath(@"/App_Data/Upload/" + doc);


            var ByteStream = new FileStream(fileName,
            FileMode.Open, FileAccess.Read, FileShare.Read);
            var reg = new Regex(@"[^\.]{3,4}$");
            ViewBag.stream = ByteStream;
            ViewBag.filename =  doc;
            ViewBag.extension = reg.Match(doc).Groups[0].Value ;
           
            ViewBag.fileDisplayName = "Defined document.pdf";
            return View();
        }

     
	}
}