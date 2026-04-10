using System;

namespace LandingPage.Domain.Entities
{
    public class CaseStudyTechnology
    {
        public Guid Id { get; set; }
        public Guid CaseStudyId { get; set; }
        public CaseStudy? CaseStudy { get; set; }
        public string Name { get; set; } = null!;
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