using LandingPage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LandingPage.Infrastructure.Configurations
{
    public class CaseStudyConfiguration : IEntityTypeConfiguration<CaseStudy>
    {
        public void Configure(EntityTypeBuilder<CaseStudy> builder)
        {
            builder.ToTable("CaseStudy", "Landing");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Slug).IsRequired().HasMaxLength(180);
            builder.HasIndex(x => x.Slug).IsUnique();
            builder.Property(x => x.Title).IsRequired().HasMaxLength(300);
            builder.Property(x => x.Category).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Icon).HasMaxLength(30);
            builder.Property(x => x.Summary).IsRequired();
            builder.Property(x => x.Client).IsRequired().HasMaxLength(200);
            builder.Property(x => x.DurationLabel).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Challenge).IsRequired();
            builder.Property(x => x.Solution).IsRequired();
            builder.Property(x => x.DetailHtml).IsRequired();
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