/**
 * Generate a WhatsApp deep link with pre-filled booking message
 */
export function generateWhatsAppLink({
  whatsappNumber = '919876543210',
  packageName,
  destination,
  travelers = 2,
  hotelStandard = '5-Star Elite',
  priceRange,
  datePreference = '',
  additionalNotes = '',
}) {
  const lines = [
    `🌟 *Booking Inquiry - Infinity Miles Travel*`,
    ``,
    `📦 *Package:* ${packageName || 'N/A'}`,
    `📍 *Destination:* ${destination || 'N/A'}`,
    `👥 *Travelers:* ${travelers}`,
    `🏨 *Hotel Preference:* ${hotelStandard}`,
  ];

  if (priceRange) {
    lines.push(`💰 *Estimated Budget:* ${priceRange.currency || '₹'}${priceRange.min?.toLocaleString('en-IN')} - ${priceRange.currency || '₹'}${priceRange.max?.toLocaleString('en-IN')} per person`);
  }

  if (datePreference) {
    lines.push(`📅 *Preferred Dates:* ${datePreference}`);
  }

  if (additionalNotes) {
    lines.push(`📝 *Notes:* ${additionalNotes}`);
  }

  lines.push(``, `I'd like to know more about this package and finalize my booking. Please get in touch!`);

  const message = lines.join('\n');
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Format price range for display
 */
export function formatPriceRange(priceRange) {
  if (!priceRange) return '';
  const { min, max, currency = '₹' } = priceRange;
  return `${currency}${min?.toLocaleString('en-IN')} - ${currency}${max?.toLocaleString('en-IN')}`;
}
