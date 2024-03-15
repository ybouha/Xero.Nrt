using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SmartComparer.DataAccess;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace SmartComparer.DataAccess
{

    public interface IRepositoryBase<T> where T : class
    {
        Task<T> GetOneAsync(params object[] ids);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression);
        void Create(T entity);
        Task<T> CreateAsync(T entity);
        void Update(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> UpdateAsync(T entity, params object[] ids);
        void Delete(int id);
        void Delete(T entity);
        Task<int> DeleteAsync(T entity);
        Task<int> DeleteAsync(int id);
        Task DeleteAsync(IEnumerable<int> ids);
        Task<T> SaveAsync(T entity, params object[] ids);
        Task<int> SaveChangesAsync();
    }




    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected DbContext RepositoryContext { get; set; }
        internal readonly ILogger Logger;

        public RepositoryBase(DbContext context, ILogger logger)
        {
            RepositoryContext = context;
            Logger = logger;
        }

        public virtual async Task<T> GetOneAsync(params object[] ids)
        {
            return await RepositoryContext.Set<T>().FindAsync(ids).ConfigureAwait(false);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await RepositoryContext.Set<T>().ToListAsync().ConfigureAwait(false);
        }

        public virtual async Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await RepositoryContext.Set<T>().Where(expression).ToListAsync().ConfigureAwait(false);
        }

        public virtual void Create(T entity)
        {
            RepositoryContext.Set<T>().Add(entity);
        }

        public virtual async Task<T> CreateAsync(T entity)
        {
            RepositoryContext.Set<T>().Add(entity);
            await RepositoryContext.SaveChangesAsync().ConfigureAwait(false);
            return entity;
        }


        public virtual void Update(T entity)
        {
            // EF Core tracks changes and applies concurrency checks during SaveChanges or SaveChangesAsync
            RepositoryContext.Set<T>().Update(entity);
        }

        public virtual async Task<T> UpdateAsync(T entity)
        {
            if (entity == null) return null;

            // EF Core handles concurrency exceptions here
            Update(entity);

            await SaveChangesAsync().ConfigureAwait(false);

            return entity;
        }

        public virtual async Task<T> UpdateAsync(T entity, params object[] ids)
        {
            if (entity == null) return null;

            var existingEntity = await RepositoryContext.Set<T>().FindAsync(ids).ConfigureAwait(false);
            if (existingEntity == null) return null;

            RepositoryContext.Entry(existingEntity).CurrentValues.SetValues(entity);

            try
            {
                await SaveChangesAsync().ConfigureAwait(false);
                return existingEntity;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                Logger.LogError(ex, "Concurrency error occurred updating an entity of type {EntityType}.", typeof(T).Name);
                // Re-throw or handle concurrency exception as needed
                throw;
            }
        }

        public virtual async Task<T> SaveAsync(T entity, params object[] ids)
        {
            if (entity == null) return null;

            var existingEntity = await RepositoryContext.Set<T>().FindAsync(ids).ConfigureAwait(false);
            if (existingEntity == null)
            {
                RepositoryContext.Set<T>().Add(entity);
            }
            else
            {
                RepositoryContext.Entry(existingEntity).CurrentValues.SetValues(entity);
            }

            try
            {
                await SaveChangesAsync().ConfigureAwait(false);
                return existingEntity ?? entity;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                Logger.LogError(ex, "Concurrency error occurred saving an entity of type {EntityType}.", typeof(T).Name);
                // Re-throw or handle concurrency exception as needed
                throw;
            }
        }

        public virtual async Task<int> SaveChangesAsync()
        {
            try
            {
                // EF Core applies any pending concurrency checks here
                return await RepositoryContext.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                Logger.LogError(ex, "Concurrency error occurred committing changes for type {EntityType}.", typeof(T).Name);
                // Re-throw or handle concurrency exception as needed
                throw;
            }
        }


        public virtual void Delete(int id)
        {
            var entity = RepositoryContext.Set<T>().Find(id);
            if (entity != null)
            {
                RepositoryContext.Set<T>().Remove(entity);
            }
        }

        public virtual void Delete(T entity)
        {
            RepositoryContext.Set<T>().Remove(entity);
        }

        public virtual async Task<int> DeleteAsync(T entity)
        {
            Delete(entity);
            return await SaveChangesAsync().ConfigureAwait(false);
        }

        public virtual async Task<int> DeleteAsync(int id)
        {
            Delete(id);
            return await SaveChangesAsync().ConfigureAwait(false);
        }

        public virtual async Task DeleteAsync(IEnumerable<int> ids)
        {
            var entities = RepositoryContext.Set<T>().Where(entity => ids.Contains((int)typeof(T).GetProperty("ID").GetValue(entity)));
            RepositoryContext.Set<T>().RemoveRange(entities);
            await SaveChangesAsync().ConfigureAwait(false);
        }


        protected virtual bool IsValid(int expectedNbItem = 1, params object[] ids)
        {
            if (ids == null || ids.Length != expectedNbItem || !int.TryParse(ids[0].ToString(), out var id))
            {
                return false;
            }
            return true;
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    RepositoryContext.Dispose();
                }
                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }

}
//ALTER TABLE Accounts
//    ADD RowVersion ROWVERSION;

//ALTER TABLE Categories
//    ADD RowVersion ROWVERSION;

//ALTER TABLE Transactions
//    ADD RowVersion ROWVERSION;


//public class Account
//{
//    // ... Other properties

//    [Timestamp]
//    public byte[] RowVersion { get; set; }
//}

//public class Category
//{
//    // ... Other properties

//    [Timestamp]
//    public byte[] RowVersion { get; set; }
//}

//public class Transaction
//{
//    // ... Other properties

//    [Timestamp]
//    public byte[] RowVersion { get; set; }
//}


public class CategoryRepository : RepositoryBase<Category>
{
    public CategoryRepository(DbContext context, ILogger<CategoryRepository> logger) : base(context, logger)
    {
    }

    // Add any category-specific data access methods here
}

public class TransactionRepository : RepositoryBase<Transaction>
{
    public TransactionRepository(DbContext context, ILogger<TransactionRepository> logger) : base(context, logger)
    {
    }

    // Add any transaction-specific data access methods here
}
