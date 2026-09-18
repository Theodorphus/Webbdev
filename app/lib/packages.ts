export const packageIds = ['bas', 'premium', 'full-service'] as const;
export type PackageId = typeof packageIds[number];
export const packageLabels = {
  sv: { bas: 'Bas', premium: 'Premium', 'full-service': 'Full Service' },
  en: { bas: 'Basic', premium: 'Premium', 'full-service': 'Full Service' },
};

export function isPackageId(value: unknown): value is PackageId {
  return typeof value === 'string' && packageIds.some(id => id === value);
}
