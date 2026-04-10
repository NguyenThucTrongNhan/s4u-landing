using System;
using System.Collections.Generic;

namespace LandingPage.Domain.Entities
{
    public class CaseStudy
    {
        public Guid Id { get; set; }
        public string Slug { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string? Icon { get; set; }
        public string Summary { get; set; } = null!;
        public string Client { get; set; } = null!;
        public string DurationLabel { get; set; } = null!;
        public string Challenge { get; set; } = null!;
        public string Solution { get; set; } = null!;
        public string DetailHtml { get; set; } = null!;
        public bool IsPublished { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
        public ICollection<CaseStudyTechnology>? Technologies { get; set; }
        public ICollection<CaseStudyImpact>? Impacts { get; set; }
    }
}