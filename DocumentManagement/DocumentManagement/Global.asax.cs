using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Data.Entity;
using DocumentManagement.Models;
using Groupdocs.Web.UI.Comparison;
using System.Net.Http.Formatting;
using System.Reflection;



namespace DocumentManagement
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();


            Groupdocs.Web.UI.Viewer.InitRoutes();
            Groupdocs.Web.UI.Viewer.SetRootStoragePath(Server.MapPath("~/App_Data/Upload"));
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
           
            //GlobalConfiguration.Configuration.Formatters.XmlFormatter.RequiredMemberSelector = new RequiredMemberSelector();
           // GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = new Newtonsoft.Json.JsonSerializerSettings();                                                        
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = new Newtonsoft.Json.JsonSerializerSettings { NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore };
        }
    }
    internal class RequiredMemberSelector : IRequiredMemberSelector
    {
        public bool IsRequiredMember(MemberInfo member)
        {
            return true;
        }
    }
}