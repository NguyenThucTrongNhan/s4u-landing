using System;

namespace LandingPage.Domain.Entities
{
    public class Lead
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Company { get; set; }
        public string? Phone { get; set; }
        public string? Interest { get; set; }
        public string? Message { get; set; }
        public string Source { get; set; } = null!;
        public string Status { get; set; } = "Cold";
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
    }
}