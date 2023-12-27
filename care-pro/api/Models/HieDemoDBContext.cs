using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace api.Models
{
    public class HieDemoDBContext : DbContext
    {
        public DbSet<LabOrder> LabOrders { get; set; }
        public DbSet<LabResults> LabResults { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = "Data Source=ZM-09-LSK-SWEYT-UTH\\;Initial Catalog=HieDemoDB;User ID=sa;Password=N0WhereMan";

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
