export function isExpiringSoon(expirationDate: Date, days = 3): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);

  const diffInMs = exp.getTime() - today.getTime();
  const maxMs = days * 1000 * 60 * 60 * 24;

  return diffInMs >= 0 && diffInMs <= maxMs;
}

export function getDaysToExpiration(expirationDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);

  const diffInMs = exp.getTime() - today.getTime();
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export function getExpirationLabel(expirationDate: Date): string {
  const days = getDaysToExpiration(expirationDate);

  if (days < 0) return "Expired";
  else if (days === 0) return "Expires today";
  else if (days === 1) return "Expires in 1 day";
  else if (days >= 30) return "Expires in 1 month";
  else if (days >= 60) return `Expires in ${Math.floor(days / 30)} months`;
  else return `Expires in ${days} days`;
}
