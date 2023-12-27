using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class LabResults
    {
        [Key]
        public int Id { get; set; } = 0;
        [Required]
        public double Results { get; set; } = 0;
    }
}
