-- Minimal seed data for lookup/config tables used by the frontend.
-- Run after: 001_FeContentSchema.sql

BEGIN;

-- -----------------------------------------------------------------------------
-- Article categories
-- -----------------------------------------------------------------------------
INSERT INTO "Landing"."ArticleCategory" ("Name", "Slug", "SortOrder")
VALUES
  ('All', 'all', 0),
  ('AI', 'ai', 1),
  ('Cloud', 'cloud', 2),
  ('Business', 'business', 3),
  ('Tutorial', 'tutorial', 4),
  ('News', 'news', 5)
ON CONFLICT ("Slug") DO UPDATE
SET "Name" = EXCLUDED."Name",
    "SortOrder" = EXCLUDED."SortOrder",
    "UpdatedBy" = 'Seed';

-- -----------------------------------------------------------------------------
-- App products for Register page
-- -----------------------------------------------------------------------------
INSERT INTO "Landing"."AppProduct" ("Code", "Name", "Icon", "Tagline", "ColorHex", "SortOrder")
VALUES
  ('ai-bot', 'AI Bot', 'AI', 'Intelligent chatbot and automation', '#6c63ff', 1),
  ('erp', 'ERP', 'ERP', 'Enterprise resource planning', '#ff6b9d', 2),
  ('sme', 'SME', 'SME', 'Small and medium enterprise suite', '#00d4aa', 3),
  ('crm', 'CRM', 'CRM', 'Customer relationship management', '#ffa500', 4),
  ('ums', 'UMS', 'UMS', 'User management system', '#00b4d8', 5),
  ('dms', 'DMS', 'DMS', 'Document management system', '#a8e063', 6)
ON CONFLICT ("Code") DO UPDATE
SET "Name" = EXCLUDED."Name",
    "Tagline" = EXCLUDED."Tagline",
    "ColorHex" = EXCLUDED."ColorHex",
    "SortOrder" = EXCLUDED."SortOrder",
    "UpdatedBy" = 'Seed';

-- -----------------------------------------------------------------------------
-- Pricing plans + features (shared by Pricing and Subscription pages)
-- -----------------------------------------------------------------------------
INSERT INTO "Landing"."PricingPlan" ("Code", "Name", "MonthlyPrice", "YearlyPrice", "Description", "IsFeatured", "SortOrder")
VALUES
  ('starter', 'Starter', 49, 39, 'For early teams shipping their first AI-enabled workflows.', FALSE, 1),
  ('growth', 'Growth', 129, 109, 'For scaling teams with higher reliability and automation needs.', TRUE, 2),
  ('scale', 'Scale', 299, 259, 'For organizations with multi-team deployments and governance requirements.', FALSE, 3)
ON CONFLICT ("Code") DO UPDATE
SET "Name" = EXCLUDED."Name",
    "MonthlyPrice" = EXCLUDED."MonthlyPrice",
    "YearlyPrice" = EXCLUDED."YearlyPrice",
    "Description" = EXCLUDED."Description",
    "IsFeatured" = EXCLUDED."IsFeatured",
    "SortOrder" = EXCLUDED."SortOrder",
    "UpdatedBy" = 'Seed';

DELETE FROM "Landing"."PricingPlanFeature"
WHERE "PricingPlanId" IN (SELECT "Id" FROM "Landing"."PricingPlan" WHERE "Code" IN ('starter', 'growth', 'scale'));

INSERT INTO "Landing"."PricingPlanFeature" ("PricingPlanId", "Text", "SortOrder")
SELECT p."Id", f."Text", f."SortOrder"
FROM "Landing"."PricingPlan" p
JOIN (
  VALUES
    ('starter', '1 production workspace', 1),
    ('starter', 'Email support', 2),
    ('starter', 'Basic analytics and monitoring', 3),
    ('growth', '5 production workspaces', 1),
    ('growth', 'Priority support and SLA', 2),
    ('growth', 'Advanced usage and cost controls', 3),
    ('scale', 'Unlimited workspaces', 1),
    ('scale', 'SSO and role-based access control', 2),
    ('scale', 'Dedicated success manager', 3)
) AS f("Code", "Text", "SortOrder")
  ON p."Code" = f."Code";

-- -----------------------------------------------------------------------------
-- About and contact static sections
-- -----------------------------------------------------------------------------
DELETE FROM "Landing"."AboutValue";
INSERT INTO "Landing"."AboutValue" ("Text", "SortOrder") VALUES
  ('Outcome-first delivery over vanity metrics', 1),
  ('Security and reliability by default', 2),
  ('Transparent communication and measurable progress', 3),
  ('Practical solutions that teams can maintain long-term', 4);

DELETE FROM "Landing"."AboutCapability";
INSERT INTO "Landing"."AboutCapability" ("Title", "Text", "SortOrder") VALUES
  ('AI Product Engineering', 'From idea to production-grade AI features with strong quality and governance.', 1),
  ('Cloud and Platform Architecture', 'Resilient, secure, and cost-efficient infrastructure design for modern workloads.', 2),
  ('Team Enablement and Training', 'Hands-on training programs that help teams ship confidently and sustainably.', 3);

DELETE FROM "Landing"."ContactChannel";
INSERT INTO "Landing"."ContactChannel" ("Title", "Value", "SortOrder") VALUES
  ('Email', 'hello@aisolutions.com', 1),
  ('Sales Line', '+1 (555) 2026-100', 2),
  ('LinkedIn', 'linkedin.com/company/aisolutions', 3);

COMMIT;
