using System;
using System.Collections.Generic;

namespace LandingPage.Domain.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Slug { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string Summary { get; set; } = null!;
        public string PriceLabel { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public string DescriptionHtml { get; set; } = null!;
        public bool IsPublished { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
        public ICollection<ProductFeature>? Features { get; set; }
        public ICollection<ProductOutcome>? Outcomes { get; set; }
    }
}