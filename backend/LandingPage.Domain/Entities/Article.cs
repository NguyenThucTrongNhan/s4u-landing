using System;
using System.Collections.Generic;

namespace LandingPage.Domain.Entities
{
    public class Article
    {
        public Guid Id { get; set; }
        public string Slug { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Excerpt { get; set; } = null!;
        public string ContentHtml { get; set; } = null!;
        public Guid? CategoryId { get; set; }
        public ArticleCategory? Category { get; set; }
        public Guid? AuthorId { get; set; }
        public Author? Author { get; set; }
        public DateTime? PublishedAt { get; set; }
        public int ReadTimeMin { get; set; }
        public string? CoverImageUrl { get; set; }
        public bool IsFeatured { get; set; }
        public string? MetaTitle { get; set; }
        public string? MetaDescription { get; set; }
        public string? MetaKeywords { get; set; }
        public string Status { get; set; } = "Published";
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }
        public ICollection<ArticleTagMap>? TagMaps { get; set; }
    }
}