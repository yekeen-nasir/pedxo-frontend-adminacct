import { format, parseISO } from "date-fns";

export function formatDate(dateString) {
    if(!dateString) return
  return format(parseISO(dateString), "MMM d, yyyy");
}
export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
