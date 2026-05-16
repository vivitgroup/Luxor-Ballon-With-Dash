-- Luxor Balloons Database Schema
-- Created: 2024
-- Supports: PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('tourist', 'operator', 'admin')) DEFAULT 'tourist',
    name TEXT NOT NULL,
    phone TEXT,
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Operators table
CREATE TABLE operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
    total_flights INTEGER DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    whatsapp TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Balloons table
CREATE TABLE balloons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    image_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flights table
CREATE TABLE flights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    balloon_id UUID NOT NULL REFERENCES balloons(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    departure_time TIMESTAMPTZ NOT NULL,
    price_per_seat DECIMAL(10,2) NOT NULL CHECK (price_per_seat >= 79),
    seats_available INTEGER NOT NULL CHECK (seats_available >= 0),
    seats_total INTEGER NOT NULL CHECK (seats_total > 0),
    status TEXT NOT NULL CHECK (status IN ('scheduled', 'boarding', 'in_air', 'completed', 'cancelled')) DEFAULT 'scheduled',
    package_type TEXT NOT NULL CHECK (package_type IN ('standard', 'premium', 'private')) DEFAULT 'standard',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_id UUID NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    seats INTEGER NOT NULL CHECK (seats > 0),
    total_price DECIMAL(12,2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
    passenger_names JSONB DEFAULT '[]',
    pickup_location_id UUID,
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    gateway TEXT NOT NULL DEFAULT 'paymob',
    status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
    transaction_id TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pickup locations table
CREATE TABLE pickup_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    coordinates JSONB,
    hotel_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weather events table
CREATE TABLE weather_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_id UUID REFERENCES flights(id) ON DELETE CASCADE,
    condition TEXT NOT NULL,
    wind_speed INTEGER,
    temperature INTEGER,
    visibility INTEGER,
    action_taken TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cancellations table
CREATE TABLE cancellations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    refund_amount DECIMAL(12,2) DEFAULT 0,
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    title_ar TEXT,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    excerpt_ar TEXT,
    content TEXT,
    content_ar TEXT,
    image_url TEXT,
    category TEXT,
    published_at TIMESTAMPTZ,
    author TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_flights_date ON flights(departure_time);
CREATE INDEX idx_flights_operator ON flights(operator_id);
CREATE INDEX idx_flights_status ON flights(status);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_flight ON bookings(flight_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_reviews_operator ON reviews(operator_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE balloons ENABLE ROW LEVEL SECURITY;
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Admins can read all data
CREATE POLICY "Admins can read all users" ON users
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Public can read active operators
CREATE POLICY "Public can read active operators" ON operators
    FOR SELECT USING (is_active = true);

-- Admins can manage all operators
CREATE POLICY "Admins can manage operators" ON operators
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Public can read scheduled flights
CREATE POLICY "Public can read scheduled flights" ON flights
    FOR SELECT USING (status = 'scheduled');

-- Admins can manage all flights
CREATE POLICY "Admins can manage flights" ON flights
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Users can read own bookings
CREATE POLICY "Users can read own bookings" ON bookings
    FOR SELECT USING (user_id = auth.uid());

-- Users can create bookings
CREATE POLICY "Users can create bookings" ON bookings
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admins can manage all bookings
CREATE POLICY "Admins can manage bookings" ON bookings
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Insert sample data
INSERT INTO operators (name, description, rating, total_flights, revenue, is_active, whatsapp, email, phone) VALUES
('Sindbad Balloons', 'Leading balloon operator with 15+ years experience', 4.9, 1200, 45000, true, '+201234567890', 'info@sindbad.com', '+20 123 456 7890'),
('Hod Hod Soliman', 'Premium flights with expert pilots', 4.8, 950, 38000, true, '+201234567891', 'contact@hodhod.com', '+20 123 456 7891'),
('Magic Horizon', 'Family-friendly balloon experiences', 4.7, 800, 32000, true, '+201234567892', 'info@magichorizon.com', '+20 123 456 7892'),
('Sky Cruise', 'Luxury champagne flights at sunrise', 4.6, 650, 28000, true, '+201234567893', 'bookings@skycruise.com', '+20 123 456 7893'),
('Nile Dream', 'Affordable quality flights with stunning Nile views', 4.5, 500, 21000, true, '+201234567894', 'info@niledream.com', '+20 123 456 7894'),
('Pharaoh's Flight', 'Authentic Egyptian experience with traditional hospitality', 4.4, 400, 18000, true, '+201234567895', 'fly@pharaoh.com', '+20 123 456 7895');

-- Insert sample blog posts
INSERT INTO blog_posts (title, title_ar, slug, excerpt, excerpt_ar, category, author, published_at) VALUES
('Best Time to Visit Luxor for Hot Air Balloon Rides', 'أفضل وقت لزيارة الأقصر لرحلات البالون الهوائية', 'best-time-visit-luxor', 'Discover the ideal seasons and weather conditions for the most spectacular balloon experiences over ancient Egypt.', 'اكتشف المواسم المثالية وظروف الطقس لأكثر تجارب البالون إذهالاً فوق مصر القديمة.', 'Travel Tips', 'Luxor Balloons Team', NOW()),
('What to Expect on Your First Hot Air Balloon Flight', 'ما يمكن توقعه في رحلتك الأولى بالبالون الهوائي', 'first-balloon-flight-guide', 'A complete guide for first-time flyers: from pre-flight preparations to landing celebrations.', 'دليل كامل للطيارين المبتدئين: من التحضيرات قبل الرحلة إلى احتفالات الهبوط.', 'Guide', 'Luxor Balloons Team', NOW());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON operators
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flights_updated_at BEFORE UPDATE ON flights
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
