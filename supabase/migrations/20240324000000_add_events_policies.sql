-- Enable RLS on events table if not already enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to non-disabled events
CREATE POLICY "Allow public read access to active events" ON events
    FOR SELECT
    TO public
    USING (NOT disabled);

-- Allow authenticated users to read all events
CREATE POLICY "Allow authenticated users to read all events" ON events
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users to insert events
CREATE POLICY "Allow authenticated users to insert events" ON events
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow authenticated users to update events
CREATE POLICY "Allow authenticated users to update events" ON events
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow authenticated users to delete events
CREATE POLICY "Allow authenticated users to delete events" ON events
    FOR DELETE
    TO authenticated
    USING (true); 