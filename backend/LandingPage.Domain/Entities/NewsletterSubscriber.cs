using System;

namespace LandingPage.Domain.Entities
{
    public class NewsletterSubscriber
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string Source { get; set; } = "LandingHero";
        public bool IsConfirmed { get; set; }
        public DateTime? ConfirmedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
    }
}