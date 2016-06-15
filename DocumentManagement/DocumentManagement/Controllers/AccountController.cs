using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WebMatrix.Data;
using WebMatrix.WebData;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using Microsoft.Web.WebPages;
using DocumentManagement.DAL;
using DocumentManagement.Models;
using DocumentManagement.Filters;
using DocumentManagement.DAL;

namespace DocumentManagement.Controllers
{
 //   [Authorize]
    [InitilizeMembership]
    public class AccountController : Controller
    {    
        public ActionResult Login(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login( LoginModel model,string returnUrl)
        {
            if (ModelState.IsValid && WebSecurity.Login(model.UserName, model.Password, persistCookie: model.RememberMe))
            {
                return Redirect("/Employee/Index");
            }
            ModelState.AddModelError("", "The username pr password was incorrect");           
            return View(model);
        }
        [HttpPost]
        public ActionResult LogOff()
        {
            WebSecurity.Logout();
            return Redirect("/Employee/Index");        
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();        
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<string> Register(RegisterModel model, Employee employee, int? Manager )
        {
            if(ModelState.IsValid)
            {
            try 
                {                   
                    WebSecurity.CreateUserAndAccount(model.UserName,model.Password);
                    WebSecurity.Login(model.UserName, model.Password);

                    var callback = await CreateEmployee(employee, model, Manager);
                    if (callback != null)
                        return "You have just registrated successfully"; 
                    else
                        return "";
                                                  
                }
                catch(MembershipCreateUserException e)
                {
                ModelState.AddModelError("",e.Message);                
                }
            }
            return" You havn't just registrated or user've existed already ";
        }

        public  async Task<string> CreateEmployee(Employee employee, RegisterModel model, int? Manager)
         {
            using (UnitOfWork db = new UnitOfWork())
            {
                        Employee _manager;
                        int _id = WebSecurity.GetUserId(model.UserName);
                        var _user = await db.User.Get(i => i.Id == _id);
                        Employee emp = employee;
                        if (Manager != null)
                        {
                             _manager = await db.Employee.Get(i => i.IdEmployee == Manager);
                        }
                        else
                        { 
                             _manager = null;
                        }
                        
                        Employee _emp = new Employee {FirstName = employee.FirstName, 
                                                      LastName = employee.LastName,
                                                      IdDepartment = employee.IdDepartment,
                                                      UserName = employee.UserName,
                                                      User= _user,
                                                      ManagerCompany = _manager,
                                                      DepartmentHead = employee.DepartmentHead
                                                    };
                        db.Employee.Add(_emp);
                       return await Task.Run(() => db.SaveChange());
                    }    
          }

        public  async Task<JsonResult> GetManager()
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                var emp =  await db.Employee.GetAll(i => i.ManagerCompany == null);
                return Json(emp, JsonRequestBehavior.AllowGet);
            }
        }
	}
}