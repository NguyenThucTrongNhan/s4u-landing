using System;
using Microsoft.EntityFrameworkCore;
using LandingPage.Domain.Entities;

namespace LandingPage.Infrastructure.Persistence
{
    public class LandingDbContext : DbContext
    {
        public LandingDbContext(DbContextOptions<LandingDbContext> options) : base(options) { }

        public DbSet<Author> Authors => Set<Author>();
        public DbSet<ArticleCategory> ArticleCategories => Set<ArticleCategory>();
        public DbSet<Article> Articles => Set<Article>();
        public DbSet<ArticleTag> ArticleTags => Set<ArticleTag>();
        public DbSet<ArticleTagMap> ArticleTagMaps => Set<ArticleTagMap>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<ProductFeature> ProductFeatures => Set<ProductFeature>();
        public DbSet<ProductOutcome> ProductOutcomes => Set<ProductOutcome>();
        public DbSet<CaseStudy> CaseStudies => Set<CaseStudy>();
        public DbSet<CaseStudyTechnology> CaseStudyTechnologies => Set<CaseStudyTechnology>();
        public DbSet<CaseStudyImpact> CaseStudyImpacts => Set<CaseStudyImpact>();
        public DbSet<HeroSlide> HeroSlides => Set<HeroSlide>();
        public DbSet<LandingService> LandingServices => Set<LandingService>();
        public DbSet<LandingStat> LandingStats => Set<LandingStat>();
        public DbSet<LandingClient> LandingClients => Set<LandingClient>();
        public DbSet<Testimonial> Testimonials => Set<Testimonial>();
        public DbSet<AboutValue> AboutValues => Set<AboutValue>();
        public DbSet<AboutCapability> AboutCapabilities => Set<AboutCapability>();
        public DbSet<ContactChannel> ContactChannels => Set<ContactChannel>();
        public DbSet<PricingPlan> PricingPlans => Set<PricingPlan>();
        public DbSet<PricingPlanFeature> PricingPlanFeatures => Set<PricingPlanFeature>();
        public DbSet<AppProduct> AppProducts => Set<AppProduct>();
        public DbSet<RegistrationRequest> RegistrationRequests => Set<RegistrationRequest>();
        public DbSet<Lead> Leads => Set<Lead>();
        public DbSet<NewsletterSubscriber> NewsletterSubscribers => Set<NewsletterSubscriber>();
        public DbSet<SubscriptionOrder> SubscriptionOrders => Set<SubscriptionOrder>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Add further configuration as needed
        }
    }
}
