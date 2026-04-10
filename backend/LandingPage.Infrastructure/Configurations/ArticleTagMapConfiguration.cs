using LandingPage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LandingPage.Infrastructure.Configurations
{
    public class ArticleTagMapConfiguration : IEntityTypeConfiguration<ArticleTagMap>
    {
        public void Configure(EntityTypeBuilder<ArticleTagMap> builder)
        {
            builder.ToTable("ArticleTagMap", "Landing");
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => new { x.ArticleId, x.TagId }).IsUnique();
            builder.Property(x => x.ArticleId).IsRequired();
            builder.Property(x => x.TagId).IsRequired();
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