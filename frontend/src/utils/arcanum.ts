export function calculatePersonalArcanum(dateStr: string): number {
  // dateStr format: YYYY-MM-DD or DD/MM/YYYY
  const digits = dateStr.replace(/\D/g, '');
  let sum = digits.split('').reduce((acc, d) => acc + parseInt(d), 0);
  while (sum > 22) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return sum;
}
