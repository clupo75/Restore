export function currencyFormat(num: number) {
  return '$' + (num / 100).toFixed(2);
}