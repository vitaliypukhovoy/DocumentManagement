using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.Data;
using WebMatrix.WebData;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using Microsoft.Web.WebPages;
using DocumentManagement.DAL;
using DocumentManagement.Models;

namespace DocumentManagement.Controllers
{
    [Authorize]
    public class DocumentController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        [Authorize]
        public  async Task<JsonResult> GetAll()
        {
            string currentUser = WebSecurity.CurrentUserName;

            using (UnitOfWork db = new UnitOfWork())
            {
                int userId = db.User.Get(i => i.UserName == currentUser).Id;
                Employee emp =  await db.Employee.Get(i => i.IdEmployee == userId);

                IEnumerable<EmployeeDocument> list = await db.EmployeeDocument.
                             GetAll(i => i.IdEmployee == emp.IdEmployee);
                var ls= list.Select(i => i.IdDocument);
                var docs = await db.Document.GetAll(x => ls.Contains(x.IdDocument)); //List<Document>
                 //var allDoc  =  docs.Where(x => list.Contains(x.IdDocument));
                return Json(docs, JsonRequestBehavior.AllowGet);
            }
        }
	}
} 


      