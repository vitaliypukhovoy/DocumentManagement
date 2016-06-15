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
    public class EmpController : Controller
    {

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var comp = db.Employee.GetAll();

                return Json(comp.Result, JsonRequestBehavior.AllowGet);
            }
        }
        public async Task<ActionResult> GetEmployee(int IdEmployee)
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var emp = await db.Employee.Get(i => i.IdEmployee == IdEmployee);
                var newEmp = new { IdDepartment = emp.IdDepartment, FirstName = emp.FirstName, LastName = emp.LastName,ManagerCompany= emp.ManagerCompany,DepartmentHead=emp.DepartmentHead };
                return Json(newEmp, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetUser(int IdEmployee)
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var user = db.User.Get(i => i.Id == IdEmployee);
                return Json(user, JsonRequestBehavior.AllowGet);
            }
        }
        public string UpdateEmployee(Employee employee)
        {
            if (employee != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    db.Employee.Udate(employee);
                    db.SaveChange();
                    return "Department was updaded";
                }
            }
            else
            {
                return "Invalid department";
            }
        }

        public string AddEmployee(Employee employee)
        {
            if (employee != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    db.Employee.Add(employee);
                    db.SaveChange();
                    return "Department was updaded";
                }
            }
            else
            {
                return "Invalid Department";
            }
        }

        public async Task<string> RemoveEmployee(Employee employee)
        {

            if (employee  != null)
            {
                using (UnitOfWork db = new UnitOfWork())
                {

                    var emp = await db.Employee.Get(i => i.IdEmployee == employee.IdEmployee);
                    db.Employee.Delete(emp);
                    db.SaveChange();
                    return "Department was removed";
                }
            }
            else
            {
                return "Invalid Department";
            }
        }
	}
}