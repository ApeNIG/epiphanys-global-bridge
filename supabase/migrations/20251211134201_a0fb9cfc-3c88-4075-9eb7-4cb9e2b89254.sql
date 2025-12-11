-- Update GM Advance Fund with website URL
UPDATE opportunities 
SET website_url = 'https://www.greatermanchester-ca.gov.uk/what-we-do/investment/gm-advance/', updated_at = now()
WHERE title = 'GM Advance Fund';