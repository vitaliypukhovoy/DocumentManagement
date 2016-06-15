using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using DocumentManagement.DAL;
using DocumentManagement.Models;

namespace DocumentManagement.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var comp = db.Company.GetAll();
             return Json(comp.Result,JsonRequestBehavior.AllowGet);
            }           
        }
        public ActionResult GetCompany(int IdCompany)
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var comp = db.Company.Get(i => i.IdCompany == IdCompany);
                return Json(comp.Result, JsonRequestBehavior.AllowGet);
            }    
        }
        public  async Task<string> UpdateCompany(Company company)
        {
            if (company != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    db.Company.Udate(company);
                    var callback = await db.SaveChange();
                    if (callback != null)
                        return "Company was updaded successfully";
                    else
                        return "";
                }
            }
            else
            {
                return "Invalid Company";
            }
        }

        public async Task<string> AddCompany(Company company)
        {
            if (company != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    db.Company.Add(company);
                    var callback = await db.SaveChange();
                    if (callback != null)
                        return "Company was updaded successfully";
                    else
                        return "";                  
                }
            }
            else
            {
                return "Invalid Company";
            }
        }

        public async Task<string> RemoveCompany(Company company)
        {
            if (company != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    var comp =  await db.Company.Get(i => i.IdCompany == company.IdCompany);
                    db.Company.Delete(comp);
                    var callback = await db.SaveChange();
                    if (callback != null)
                        return "Company was removed successfully";
                    else
                        return "";                    
                }
            }
            else
            {
                return "Invalid Company";
            }
        }
	}
}