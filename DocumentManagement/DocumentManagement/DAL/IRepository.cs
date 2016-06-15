using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace DocumentManagement.DAL
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> predicate = null);
        Task<T> Get(Expression<Func<T, bool>> predicate = null);
        void Add(T entity);
        void Udate(T entity);
        void Delete(T entity);
        Task<long> Count();

    }
}