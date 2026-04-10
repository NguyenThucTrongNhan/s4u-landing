using System;

namespace LandingPage.Domain.Entities
{
    public class ArticleTagMap
    {
        public Guid Id { get; set; }
        public Guid ArticleId { get; set; }
        public Article? Article { get; set; }
        public Guid TagId { get; set; }
        public ArticleTag? Tag { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
    }
}