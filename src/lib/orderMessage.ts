import { formatKES } from '@/lib/format';
import type { CartLine } from '@/context/CartContext';

interface OrderMessageInput {
  lines: CartLine[];
  subtotal: number;
  customerName: string;
  phone: string;
  fulfillment: 'pickup' | 'delivery';
  requestedDate: string;
  notes: string;
}

export function buildCartOrderMessage({
  lines,
  subtotal,
  customerName,
  phone,
  fulfillment,
  requestedDate,
  notes,
}: OrderMessageInput): string {
  const itemLines = lines.map((line) => `- ${line.qty} x ${line.title} (${formatKES(line.price * line.qty)})`);
  const parts = [
    'Hello Ambatana Kitchen, I would like to place an order:',
    '',
    ...itemLines,
    '',
    `Total: ${formatKES(subtotal)}`,
    `Fulfilment: ${fulfillment === 'pickup' ? 'Pickup' : 'Delivery'}`,
  ];
  if (requestedDate) parts.push(`Date needed: ${requestedDate}`);
  parts.push(`Name: ${customerName}`, `Phone: ${phone}`);
  if (notes) parts.push(`Notes: ${notes}`);
  return parts.join('\n');
}
