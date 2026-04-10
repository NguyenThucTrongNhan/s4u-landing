-- PostgreSQL schema proposal for replacing frontend hardcoded data.
-- Rules applied:
-- 1) PascalCase names (quoted identifiers)
-- 2) UUID primary key on every table
-- 3) Standard audit fields on every table

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS "Landing";

-- -----------------------------------------------------------------------------
-- Shared utility: keep UpdatedAt current on UPDATE
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION "Landing"."SetUpdatedAt"()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW."UpdatedAt" = NOW();
  RETURN NEW;
END;
$$;

-- -----------------------------------------------------------------------------
-- Core content
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Landing"."Author" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Name" VARCHAR(150) NOT NULL,
  "Role" VARCHAR(150) NOT NULL,
  "AvatarUrl" VARCHAR(500) NULL,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."ArticleCategory" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Name" VARCHAR(100) NOT NULL,
  "Slug" VARCHAR(120) NOT NULL UNIQUE,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."Article" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Slug" VARCHAR(180) NOT NULL UNIQUE,
  "Title" VARCHAR(300) NOT NULL,
  "Excerpt" TEXT NOT NULL,
  "ContentHtml" TEXT NOT NULL,
  "CategoryId" UUID NULL REFERENCES "Landing"."ArticleCategory"("Id"),
  "AuthorId" UUID NULL REFERENCES "Landing"."Author"("Id"),
  "PublishedAt" TIMESTAMPTZ NULL,
  "ReadTimeMin" INT NOT NULL DEFAULT 1,
  "CoverImageUrl" VARCHAR(500) NULL,
  "IsFeatured" BOOLEAN NOT NULL DEFAULT FALSE,
  "MetaTitle" VARCHAR(300) NULL,
  "MetaDescription" VARCHAR(500) NULL,
  "MetaKeywords" VARCHAR(500) NULL,
  "Status" VARCHAR(50) NOT NULL DEFAULT 'Published',
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL,
  CONSTRAINT "CK_Article_Status" CHECK ("Status" IN ('Draft', 'Published', 'Archived'))
);
CREATE INDEX IF NOT EXISTS "IX_Article_PublishedAt" ON "Landing"."Article"("PublishedAt");
CREATE INDEX IF NOT EXISTS "IX_Article_IsFeatured" ON "Landing"."Article"("IsFeatured");

CREATE TABLE IF NOT EXISTS "Landing"."ArticleTag" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Name" VARCHAR(100) NOT NULL,
  "Slug" VARCHAR(120) NOT NULL UNIQUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."ArticleTagMap" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "ArticleId" UUID NOT NULL REFERENCES "Landing"."Article"("Id") ON DELETE CASCADE,
  "TagId" UUID NOT NULL REFERENCES "Landing"."ArticleTag"("Id") ON DELETE CASCADE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL,
  CONSTRAINT "UQ_ArticleTagMap_Article_Tag" UNIQUE ("ArticleId", "TagId")
);

CREATE TABLE IF NOT EXISTS "Landing"."Course" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Slug" VARCHAR(180) NOT NULL UNIQUE,
  "Title" VARCHAR(300) NOT NULL,
  "Level" VARCHAR(50) NOT NULL,
  "Category" VARCHAR(100) NOT NULL,
  "DurationLabel" VARCHAR(100) NOT NULL,
  "Format" VARCHAR(100) NOT NULL,
  "PriceLabel" VARCHAR(120) NOT NULL,
  "Summary" TEXT NOT NULL,
  "DetailHtml" TEXT NOT NULL,
  "IsPublished" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL,
  CONSTRAINT "CK_Course_Level" CHECK ("Level" IN ('Beginner', 'Intermediate', 'Advanced')),
  CONSTRAINT "CK_Course_Format" CHECK ("Format" IN ('Live Online', 'Self-paced', 'Hybrid'))
);

CREATE TABLE IF NOT EXISTS "Landing"."CourseOutcome" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "CourseId" UUID NOT NULL REFERENCES "Landing"."Course"("Id") ON DELETE CASCADE,
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."CourseCurriculumItem" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "CourseId" UUID NOT NULL REFERENCES "Landing"."Course"("Id") ON DELETE CASCADE,
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."Product" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Slug" VARCHAR(180) NOT NULL UNIQUE,
  "Name" VARCHAR(300) NOT NULL,
  "Category" VARCHAR(100) NOT NULL,
  "Summary" TEXT NOT NULL,
  "PriceLabel" VARCHAR(120) NOT NULL,
  "Audience" VARCHAR(200) NOT NULL,
  "DescriptionHtml" TEXT NOT NULL,
  "IsPublished" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL,
  CONSTRAINT "CK_Product_Category" CHECK ("Category" IN ('SaaS', 'Service', 'Platform'))
);

CREATE TABLE IF NOT EXISTS "Landing"."ProductFeature" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "ProductId" UUID NOT NULL REFERENCES "Landing"."Product"("Id") ON DELETE CASCADE,
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."ProductOutcome" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "ProductId" UUID NOT NULL REFERENCES "Landing"."Product"("Id") ON DELETE CASCADE,
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."CaseStudy" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Slug" VARCHAR(180) NOT NULL UNIQUE,
  "Title" VARCHAR(300) NOT NULL,
  "Category" VARCHAR(100) NOT NULL,
  "Icon" VARCHAR(30) NULL,
  "Summary" TEXT NOT NULL,
  "Client" VARCHAR(200) NOT NULL,
  "DurationLabel" VARCHAR(100) NOT NULL,
  "Challenge" TEXT NOT NULL,
  "Solution" TEXT NOT NULL,
  "DetailHtml" TEXT NOT NULL,
  "IsPublished" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."CaseStudyTechnology" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "CaseStudyId" UUID NOT NULL REFERENCES "Landing"."CaseStudy"("Id") ON DELETE CASCADE,
  "Name" VARCHAR(120) NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."CaseStudyImpact" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "CaseStudyId" UUID NOT NULL REFERENCES "Landing"."CaseStudy"("Id") ON DELETE CASCADE,
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

-- -----------------------------------------------------------------------------
-- Landing and static page CMS-style blocks
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Landing"."HeroSlide" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "ImageUrl" VARCHAR(500) NOT NULL,
  "Label" VARCHAR(120) NOT NULL,
  "Title" VARCHAR(250) NOT NULL,
  "Highlight" VARCHAR(120) NOT NULL,
  "Description" TEXT NOT NULL,
  "StatPrimaryValue" VARCHAR(60) NOT NULL,
  "StatPrimaryLabel" VARCHAR(120) NOT NULL,
  "StatPrimarySub" VARCHAR(200) NOT NULL,
  "StatSecondaryValue" VARCHAR(60) NOT NULL,
  "StatSecondaryLabel" VARCHAR(120) NOT NULL,
  "StatSecondarySub" VARCHAR(200) NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."LandingService" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Icon" VARCHAR(30) NULL,
  "Title" VARCHAR(150) NOT NULL,
  "Description" TEXT NOT NULL,
  "Tag" VARCHAR(100) NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."LandingStat" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Value" VARCHAR(80) NOT NULL,
  "Label" VARCHAR(150) NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."LandingClient" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Name" VARCHAR(150) NOT NULL,
  "Initials" VARCHAR(10) NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."Testimonial" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Quote" TEXT NOT NULL,
  "PersonName" VARCHAR(150) NOT NULL,
  "Role" VARCHAR(150) NOT NULL,
  "Company" VARCHAR(150) NOT NULL,
  "AvatarText" VARCHAR(20) NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."AboutValue" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."AboutCapability" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Title" VARCHAR(200) NOT NULL,
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."ContactChannel" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Title" VARCHAR(120) NOT NULL,
  "Value" VARCHAR(250) NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

-- -----------------------------------------------------------------------------
-- Pricing, app catalog, and conversion flow
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Landing"."PricingPlan" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Code" VARCHAR(50) NOT NULL UNIQUE,
  "Name" VARCHAR(120) NOT NULL,
  "MonthlyPrice" NUMERIC(12,2) NOT NULL,
  "YearlyPrice" NUMERIC(12,2) NOT NULL,
  "Description" TEXT NOT NULL,
  "IsFeatured" BOOLEAN NOT NULL DEFAULT FALSE,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."PricingPlanFeature" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "PricingPlanId" UUID NOT NULL REFERENCES "Landing"."PricingPlan"("Id") ON DELETE CASCADE,
  "Text" TEXT NOT NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."AppProduct" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Code" VARCHAR(50) NOT NULL UNIQUE,
  "Name" VARCHAR(120) NOT NULL,
  "Icon" VARCHAR(30) NULL,
  "Tagline" VARCHAR(300) NOT NULL,
  "ColorHex" VARCHAR(20) NULL,
  "SortOrder" INT NOT NULL DEFAULT 0,
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."RegistrationRequest" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "AppProductId" UUID NOT NULL REFERENCES "Landing"."AppProduct"("Id"),
  "FullName" VARCHAR(200) NOT NULL,
  "Company" VARCHAR(200) NOT NULL,
  "Email" VARCHAR(255) NOT NULL,
  "Phone" VARCHAR(30) NULL,
  "PasswordHash" VARCHAR(255) NOT NULL,
  "Status" VARCHAR(50) NOT NULL DEFAULT 'Pending',
  "Source" VARCHAR(60) NOT NULL DEFAULT 'RegisterPage',
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL,
  CONSTRAINT "CK_RegistrationRequest_Status" CHECK ("Status" IN ('Pending', 'EmailSent', 'Provisioning', 'Active', 'Failed'))
);
CREATE INDEX IF NOT EXISTS "IX_RegistrationRequest_Email" ON "Landing"."RegistrationRequest"("Email");

CREATE TABLE IF NOT EXISTS "Landing"."Lead" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "FullName" VARCHAR(200) NOT NULL,
  "Email" VARCHAR(255) NOT NULL,
  "Company" VARCHAR(200) NULL,
  "Phone" VARCHAR(30) NULL,
  "Interest" VARCHAR(120) NULL,
  "Message" TEXT NULL,
  "Source" VARCHAR(60) NOT NULL,
  "Status" VARCHAR(30) NOT NULL DEFAULT 'Cold',
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL,
  CONSTRAINT "CK_Lead_Status" CHECK ("Status" IN ('Cold', 'Warm', 'Hot', 'Qualified', 'Lost'))
);
CREATE INDEX IF NOT EXISTS "IX_Lead_Source" ON "Landing"."Lead"("Source");
CREATE INDEX IF NOT EXISTS "IX_Lead_Email" ON "Landing"."Lead"("Email");

CREATE TABLE IF NOT EXISTS "Landing"."NewsletterSubscriber" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Email" VARCHAR(255) NOT NULL UNIQUE,
  "Source" VARCHAR(60) NOT NULL DEFAULT 'LandingHero',
  "IsConfirmed" BOOLEAN NOT NULL DEFAULT FALSE,
  "ConfirmedAt" TIMESTAMPTZ NULL,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "Landing"."SubscriptionOrder" (
  "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "PricingPlanId" UUID NOT NULL REFERENCES "Landing"."PricingPlan"("Id"),
  "BillingCycle" VARCHAR(20) NOT NULL,
  "PaymentMethod" VARCHAR(20) NOT NULL,
  "RunMode" VARCHAR(20) NOT NULL,
  "CompanyName" VARCHAR(200) NOT NULL,
  "ContactEmail" VARCHAR(255) NOT NULL,
  "Seats" INT NOT NULL,
  "Note" TEXT NULL,
  "Status" VARCHAR(30) NOT NULL DEFAULT 'Pending',
  "UnitPrice" NUMERIC(12,2) NOT NULL,
  "TotalPrice" NUMERIC(12,2) NOT NULL,
  "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "CreatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "UpdatedBy" VARCHAR(100) NOT NULL DEFAULT 'System',
  "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
  "DeletedAt" TIMESTAMPTZ NULL,
  "DeletedBy" VARCHAR(100) NULL,
  CONSTRAINT "CK_SubscriptionOrder_BillingCycle" CHECK ("BillingCycle" IN ('monthly', 'yearly')),
  CONSTRAINT "CK_SubscriptionOrder_PaymentMethod" CHECK ("PaymentMethod" IN ('card', 'bank', 'invoice')),
  CONSTRAINT "CK_SubscriptionOrder_RunMode" CHECK ("RunMode" IN ('cloud', 'standalone')),
  CONSTRAINT "CK_SubscriptionOrder_Status" CHECK ("Status" IN ('Pending', 'Paid', 'Failed', 'Cancelled')),
  CONSTRAINT "CK_SubscriptionOrder_Seats" CHECK ("Seats" > 0)
);

-- -----------------------------------------------------------------------------
-- Trigger setup for UpdatedAt (all tables in Landing schema with UpdatedAt column)
-- -----------------------------------------------------------------------------
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT t.table_name
    FROM information_schema.tables t
    JOIN information_schema.columns c
      ON c.table_schema = t.table_schema
     AND c.table_name = t.table_name
     AND c.column_name = 'UpdatedAt'
    WHERE t.table_schema = 'Landing'
      AND t.table_type = 'BASE TABLE'
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS "TR_%s_SetUpdatedAt" ON "Landing"."%s";', r.table_name, r.table_name);
    EXECUTE format('CREATE TRIGGER "TR_%s_SetUpdatedAt" BEFORE UPDATE ON "Landing"."%s" FOR EACH ROW EXECUTE FUNCTION "Landing"."SetUpdatedAt"();', r.table_name, r.table_name);
  END LOOP;
END;
$$;
