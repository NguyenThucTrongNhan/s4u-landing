using System;

namespace LandingPage.Domain.Entities
{
    public class PricingPlanFeature
    {
        public Guid Id { get; set; }
        public Guid PricingPlanId { get; set; }
        public PricingPlan? PricingPlan { get; set; }
        public string Text { get; set; } = null!;
        public int SortOrder { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
    }
}