-- Update the website URL for Healthcare Innovation opportunity
UPDATE opportunities 
SET website_url = 'https://hltheqt.com/', updated_at = now()
WHERE title ILIKE '%Healthcare Innovation%' OR title ILIKE '%Seed Funding%Healthcare%';