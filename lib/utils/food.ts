export function isExpiringSoon(expirationDate: Date, days = 3): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);

  const diffInMs = exp.getTime() - today.getTime();
  const maxMs = days * 1000 * 60 * 60 * 24;

  return diffInMs >= 0 && diffInMs <= maxMs;
}
