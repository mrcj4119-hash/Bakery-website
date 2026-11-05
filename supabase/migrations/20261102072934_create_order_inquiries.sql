/*
# Create order inquiries table

1. New Tables
- `order_inquiries`: one row per custom order or cart inquiry submitted from the website.
  - `id` (uuid, primary key)
  - `created_at` (timestamptz, defaults to now)
  - `customer_name` (text, required, 1-120 chars)
  - `phone` (text, required, 3-30 chars)
  - `email` (text, optional, up to 200 chars)
  - `occasion` (text, required: Birthday, Wedding, Corporate, Daily Treat)
  - `product_type` (text, required: Cake, Pastry Box, Catering Platter)
  - `guest_count` (integer, optional, 1-5000)
  - `requested_date` (date, optional pickup or delivery date)
  - `fulfillment` (text, pickup or delivery)
  - `dietary` (text array, dietary requests)
  - `items` (jsonb, cart line items selected from the menu)
  - `notes` (text, optional, up to 2000 chars)
  - `status` (text, defaults to new)

2. Security
- Enable RLS on `order_inquiries`.
- Grant INSERT only to `anon` and `authenticated` so the public site can submit inquiries.
- No SELECT grant or policy: visitors cannot read other customers' inquiries. Staff review inquiries in the Supabase dashboard.

3. Important Notes
- Check constraints keep stored values within sensible bounds even if the browser is bypassed.
- Statements use IF NOT EXISTS and DROP POLICY IF EXISTS so the migration can be safely re-run.
*/

CREATE TABLE IF NOT EXISTS order_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  customer_name text NOT NULL CHECK (char_length(customer_name) BETWEEN 1 AND 120),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 3 AND 30),
  email text CHECK (email IS NULL OR char_length(email) <= 200),
  occasion text NOT NULL CHECK (occasion IN ('Birthday', 'Wedding', 'Corporate', 'Daily Treat', 'Other')),
  product_type text NOT NULL CHECK (product_type IN ('Cake', 'Pastry Box', 'Catering Platter', 'Menu Order')),
  guest_count integer CHECK (guest_count IS NULL OR guest_count BETWEEN 1 AND 5000),
  requested_date date,
  fulfillment text NOT NULL DEFAULT 'pickup' CHECK (fulfillment IN ('pickup', 'delivery')),
  dietary text[] NOT NULL DEFAULT '{}',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text CHECK (notes IS NULL OR char_length(notes) <= 2000),
  status text NOT NULL DEFAULT 'new'
);

ALTER TABLE order_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON order_inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "public_insert_order_inquiries" ON order_inquiries;
CREATE POLICY "public_insert_order_inquiries" ON order_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new');
