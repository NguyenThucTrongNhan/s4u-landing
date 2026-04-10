using System;

namespace LandingPage.Domain.Entities
{
    public class SubscriptionOrder
    {
        public Guid Id { get; set; }
        public Guid PricingPlanId { get; set; }
        public PricingPlan? PricingPlan { get; set; }
        public string BillingCycle { get; set; } = null!;
        public string PaymentMethod { get; set; } = null!;
        public string RunMode { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string ContactEmail { get; set; } = null!;
        public int Seats { get; set; }
        public string? Note { get; set; }
        public string Status { get; set; } = "Pending";
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
    }
}