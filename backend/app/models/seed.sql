INSERT INTO crime_incidents (category, severity, description, occurred_at, location, district, source)
VALUES
  ('theft', 82, 'Reported theft incident', now() - interval '2 hours', ST_GeogFromText('POINT(77.2090 28.6139)'), 'Old Market', 'seed_data'),
  ('assault', 91, 'Reported assault incident', now() - interval '5 hours', ST_GeogFromText('POINT(77.2248 28.6162)'), 'North Pier', 'seed_data'),
  ('vandalism', 42, 'Reported vandalism incident', now() - interval '1 day', ST_GeogFromText('POINT(77.2182 28.6201)'), 'Central Grid', 'seed_data'),
  ('fraud', 33, 'Reported fraud incident', now() - interval '3 days', ST_GeogFromText('POINT(77.2144 28.6269)'), 'Tech Park', 'seed_data')
ON CONFLICT DO NOTHING;
