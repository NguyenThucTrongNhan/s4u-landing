using System;

namespace LandingPage.Domain.Entities
{
    public class Testimonial
    {
        public Guid Id { get; set; }
        public string Quote { get; set; } = null!;
        public string PersonName { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string Company { get; set; } = null!;
        public string? AvatarText { get; set; }
        public int SortOrder { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
    }
}