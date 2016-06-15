using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DocumentManagement.Models;

namespace DocumentManagement.DAL
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private ContextDB m_context = null;
        DbSet<T> m_DbSet;
        public Repository(ContextDB context)
        {            
            m_context = context;
            m_DbSet = m_context.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> predicate = null)
        {
            m_context.Configuration.ProxyCreationEnabled = false;
            if (predicate != null)
            {
                return  await m_DbSet.Where(predicate).ToListAsync();
            }
            return m_DbSet;
        }

        public async Task<T> Get(Expression<Func<T, bool>> predicate = null)
        {
            return await m_DbSet.FirstOrDefaultAsync(predicate);
        }
        public  void Add(T entity)
        {
            m_DbSet.Add(entity);
        }
        public  void Udate(T entity)
        {
            m_DbSet.Attach(entity);
            ((IObjectContextAdapter)m_context).ObjectContext.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
         }

        public   void Delete(T entity)
        {
            m_DbSet.Remove(entity);
           // m_DbSet.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
        }

        public async Task<long> Count()
        {
            return await m_DbSet.CountAsync();
        }

    }
}