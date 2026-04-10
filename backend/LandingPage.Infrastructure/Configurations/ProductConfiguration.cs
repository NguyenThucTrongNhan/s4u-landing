using LandingPage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LandingPage.Infrastructure.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Product", "Landing");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Slug).IsRequired().HasMaxLength(180);
            builder.HasIndex(x => x.Slug).IsUnique();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(300);
            builder.Property(x => x.Category).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Summary).IsRequired();
            builder.Property(x => x.PriceLabel).IsRequired().HasMaxLength(120);
            builder.Property(x => x.Audience).IsRequired().HasMaxLength(200);
            builder.Property(x => x.DescriptionHtml).IsRequired();
            builder.Property(x => x.IsPublished).IsRequired();
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