using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class LabOrder
    {
        [Key]
        public int Id { get; set; } = new System.Random().Next();
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string LabTest { get; set; } = string.Empty;
        [Required]
        public string SampleType { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }
}
