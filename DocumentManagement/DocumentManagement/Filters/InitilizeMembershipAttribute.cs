using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using WebMatrix.Data;
using WebMatrix.WebData;
using DocumentManagement.Models;

namespace DocumentManagement.Filters
{

     [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public sealed class InitilizeMembershipAttribute : ActionFilterAttribute
    {
         private static MembershipInitilizer Initilizer;
         private static object InitilizerLock = new object();
         private static bool IsInitilizer;
         
         public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            LazyInitializer.EnsureInitialized(ref Initilizer,  ref IsInitilizer, ref InitilizerLock);
        }
        private class MembershipInitilizer
        {
            public MembershipInitilizer()
            {
                System.Data.Entity.Database.SetInitializer<ContextDB>(null);
                try {

                    using (var context = new ContextDB())
                    {
                        if (!context.Database.Exists()) {

                            ((IObjectContextAdapter)context).ObjectContext.CreateDatabase();                            
                        }                                            
                    }
                    WebSecurity.InitializeDatabaseConnection("Documents", "Users", "Id", "UserName", autoCreateTables: true);
                }
                catch(Exception ex)
                {
                    throw new InvalidOperationException("The Membership provider can't initilizer", ex);
                }
             //   System.Data.Entity.Database.SetInitializer<ContextDB>(new Initialize());                           
            }
        }
    }

    

}