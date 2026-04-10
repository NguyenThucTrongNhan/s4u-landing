using LandingPage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LandingPage.Infrastructure.Configurations
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.ToTable("Article", "Landing");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Slug).IsRequired().HasMaxLength(180);
            builder.HasIndex(x => x.Slug).IsUnique();
            builder.Property(x => x.Title).IsRequired().HasMaxLength(300);
            builder.Property(x => x.Excerpt).IsRequired();
            builder.Property(x => x.ContentHtml).IsRequired();
            builder.Property(x => x.CategoryId);
            builder.Property(x => x.AuthorId);
            builder.Property(x => x.PublishedAt);
            builder.Property(x => x.ReadTimeMin).IsRequired();
            builder.Property(x => x.CoverImageUrl).HasMaxLength(500);
            builder.Property(x => x.IsFeatured).IsRequired();
            builder.Property(x => x.MetaTitle).HasMaxLength(300);
            builder.Property(x => x.MetaDescription).HasMaxLength(500);
            builder.Property(x => x.MetaKeywords).HasMaxLength(500);
            builder.Property(x => x.Status).IsRequired().HasMaxLength(50);
            builder.Property(x => x.CreatedAt).IsRequired();
            builder.Property(x => x.CreatedBy).IsRequired().HasMaxLength(100);
            builder.Property(x => x.UpdatedAt).IsRequired();
            builder.Property(x => x.UpdatedBy).IsRequired().HasMaxLength(100);
            builder.Property(x => x.IsDeleted).IsRequired();
            builder.Property(x => x.DeletedAt);
            builder.Property(x => x.DeletedBy).HasMaxLength(100);
        }
    }
}