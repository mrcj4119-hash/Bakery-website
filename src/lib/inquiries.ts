import { supabase } from '@/lib/supabase';

export interface InquiryPayload {
  customer_name: string;
  phone: string;
  email: string | null;
  occasion: string;
  product_type: string;
  guest_count: number | null;
  requested_date: string | null;
  fulfillment: 'pickup' | 'delivery';
  dietary: string[];
  items: { id: string; title: string; price: number; qty: number }[];
  notes: string | null;
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  if (!supabase) {
    throw new Error('Order service is not configured.');
  }
  const { error } = await supabase.from('order_inquiries').insert(payload);
  if (error) {
    throw new Error(error.message);
  }
}
