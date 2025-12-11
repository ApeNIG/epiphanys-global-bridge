-- Update Black Seed Ventures with website URL
UPDATE opportunities 
SET website_url = 'https://www.blackseedvc.co.uk/', updated_at = now()
WHERE title = 'Black Seed Ventures';