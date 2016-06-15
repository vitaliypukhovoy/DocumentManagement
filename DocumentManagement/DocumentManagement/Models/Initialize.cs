using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;

namespace DocumentManagement.Models
{
    public class Initialize: DropCreateDatabaseAlways<ContextDB>
    {
        protected override void Seed(ContextDB context)
        {

          List<Company> copm = new List<Company>(){
          new Company { IdCompany = 1, NameCompany = "Apple" },
          new Company { IdCompany = 2, NameCompany = "Microsoft" },
          new Company { IdCompany = 3, NameCompany = "HP" },
          new Company { IdCompany = 4, NameCompany = "ASUS" },
          new Company { IdCompany = 5, NameCompany = "Sony" },
          new Company { IdCompany = 6, NameCompany = "Acer" },
          new Company { IdCompany = 7, NameCompany = "IBM" },
          new Company { IdCompany = 8, NameCompany = "Lenovo" }
        };
            context.Company.AddRange(copm);
            context.SaveChanges();

            context.Departments.Add(new Department {IdDepartment=1,IdCompany=2,DepartmentName="Head department"});
            context.SaveChanges();

            //var headOffice = new Employee {IdDepartment=1,FirstName ="Head Office", LastName = "Head Office" };
            //context.Employees.Add(headOffice);
            //context.SaveChanges();

            //var managerComp = new Employee { IdDepartment = 1, FirstName = "ManagerCompany", LastName = "ManagerCompany" };
            //context.Employees.Add(managerComp);
            //context.SaveChanges();
            
            //List<Employee> emp =new List<Employee>(){
            //new  Employee{IdDepartment=1,FirstName="Anton",LastName="Prohorov",DepartmentHead=headOffice,ManagerCompany=managerComp},
            // new  Employee{IdDepartment=1,FirstName="Sidorov",LastName="Sergiy", DepartmentHead=headOffice,ManagerCompany=managerComp},
            //  new  Employee{IdDepartment=1,FirstName="Vosichkin",LastName="Aleksiy",DepartmentHead=headOffice,ManagerCompany=managerComp},
            //   new  Employee{IdDepartment=1,FirstName="Petrenko",LastName="Pavlo",DepartmentHead=headOffice,ManagerCompany=managerComp},
            //    new  Employee{IdDepartment=1,FirstName="Ivanenko",LastName="Petro",DepartmentHead=headOffice,ManagerCompany=managerComp},
            //     new  Employee{IdDepartment=1,FirstName="Derzhavin",LastName="Nikolay",DepartmentHead=headOffice,ManagerCompany=managerComp},
            //      new  Employee{IdDepartment=1,FirstName="Pavlichenko",LastName="Artur",DepartmentHead=headOffice,ManagerCompany=managerComp},
            //       new  Employee{IdDepartment=1,FirstName="Kublev",LastName="Arkadiy",DepartmentHead=headOffice,ManagerCompany=managerComp},
            //        new  Employee{IdDepartment=1,FirstName="Teteruk",LastName="Daniil",DepartmentHead=headOffice,ManagerCompany=managerComp}
            //};
            //context.Employees.AddRange(emp);
            //context.SaveChanges();


            //List<Document> doc = new List<Document>() { 
            //new Document{Autor="Ivanov",DocCipher=3333,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Petrov",DocCipher=3663,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Sydoriv",DocCipher=333993,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Vosychkin",DocCipher=3339333,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Petrenki",DocCipher=3333333,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Ivanenko",DocCipher=3389333,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Porishenko",DocCipher=3332823,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Sydorenko",DocCipher=332133,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Pavlichenko",DocCipher=1233333,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Avackov",DocCipher=33310933,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Arbuzov",DocCipher=33312313,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Ivanchenko",DocCipher=33012333,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Petrenko",DocCipher=333010393,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Kappov",DocCipher=333313,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Ilin",DocCipher=33912333,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Metrophanov",DocCipher=33912038,DocName="VeryNeedDoc",DocData=DateTime.Now},
            //new Document{Autor="Kuzmenko",DocCipher=333909133,DocName="VeryNeedDoc",DocData=DateTime.Now}
           
            //};
            //context.Documents.AddRange(doc);
            //context.SaveChanges();
            
           

        }

    }
}