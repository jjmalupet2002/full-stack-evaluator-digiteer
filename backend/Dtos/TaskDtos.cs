using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
    public class CreateTaskDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string Title { get; set; } = string.Empty;
    }

    public class UpdateTaskDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public bool IsDone { get; set; }
    }
}
