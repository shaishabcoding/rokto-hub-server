export const userSearchableFields = [
  "email",
  "name.firstName",
  "name.lastName",
];

export const badgePrices: Record<string, number> = {
  bronze: 0,
  silver: 30,
  gold: 50,
  platinum: 70,
} as const;

export type TBadge = keyof typeof badgePrices;
export const badgeEnums: TBadge[] = Object.keys(badgePrices) as TBadge[];
