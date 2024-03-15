using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartComparer.DataAccess
{
    // DbContext
    public class FinancialContext : DbContext
    {
        public FinancialContext(DbContextOptions<FinancialContext> options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .HasMany(a => a.Transactions)
                .WithOne(t => t.Account)
                .HasForeignKey(t => t.AccountID);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Transactions)
                .WithOne(t => t.Category)
                .HasForeignKey(t => t.CategoryID);
        }
    }


    //// In Program.cs (ASP.NET Core 6+)
    //var builder = WebApplication.CreateBuilder(args);

    //builder.Services.AddDbContext<FinancialContext>(options =>
    //    options.UseSqlServer(builder.Configuration.GetConnectionString("FinancialDatabase")));



    // Account Model
    public class Account
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }

        // Navigation property for related Transactions
        public virtual ICollection<Transaction> Transactions { get; set; }
    }

    // Category Model
    public class Category
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public int Type { get; set; } // 0 for Expense, 1 for Income

        [Timestamp]
        public byte[] RowVersion { get; set; }

        // Navigation property for related Transactions
        public virtual ICollection<Transaction> Transactions { get; set; }
    }

    // Transaction Model
    public class Transaction
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Account")]
        public int AccountID { get; set; }

        public virtual Account Account { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        [ForeignKey("Category")]
        public int CategoryID { get; set; }

        public virtual Category Category { get; set; }

        [MaxLength(255)]
        public string Comment { get; set; }

        public DateTime Date { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }

}
