using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DocumentManagement.DAL;
using DocumentManagement.Models;
using System.Diagnostics;

namespace DocumentManagement.Controllers
{
   [Authorize]
    public class DepartmentController : Controller
    {         
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var comp =  db.Department.GetAll();

                return Json(comp.Result, JsonRequestBehavior.AllowGet);
            }
        }
     
        public async Task<ActionResult> GetDepartment(int IdDepartment)
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var dep = await db.Department.Get(i => i.IdDepartment == IdDepartment);
                var comp =  await db.Company.Get(i => i.IdCompany == dep.IdCompany);
                var newDep = new { IdDepartment = dep.IdDepartment, DepartmentName = dep.DepartmentName, IdCompany = dep.IdCompany, Company = comp.NameCompany };
                return Json(newDep, JsonRequestBehavior.AllowGet);
            }
        }
      
        public  async Task<string> UpdateDepartment(Department department)
        {
            if (department != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {

                 db.Department.Udate(department);

                 var callback= await db.SaveChange();
                 if (callback != null)
                     return "Customer was updaded successfully";
                 else
                     return "";
                }
            }
            else
            {
                return "Invalid department";
            }
        }

        public async Task<string> AddDepartment(Department department)
        {
            if (department != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                   db.Department.Add(department);

                   var callback = await db.SaveChange();
                   if (callback != null)
                       return "Customer was added successfully";
                   else
                       return "";
                }
            }
            else
            {
                return "Invalid Department";
            }
        }

        public async Task<string> RemoveDepartment(Department department)
        {
            if (department != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    var dep =  await db.Department.Get(i => i.IdDepartment == department.IdDepartment);
                    db.Department.Delete(dep);
                     var callback= await db.SaveChange();
                     if (callback != null)
                         return "Department was removed";
                     else
                         return "";
                }
            }
            else
            {
                return "Invalid Department";
            }
        }
	}
}