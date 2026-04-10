using System;

namespace LandingPage.Domain.Entities
{
    public class HeroSlide
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; } = null!;
        public string Label { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Highlight { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string StatPrimaryValue { get; set; } = null!;
        public string StatPrimaryLabel { get; set; } = null!;
        public string StatPrimarySub { get; set; } = null!;
        public string StatSecondaryValue { get; set; } = null!;
        public string StatSecondaryLabel { get; set; } = null!;
        public string StatSecondarySub { get; set; } = null!;
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