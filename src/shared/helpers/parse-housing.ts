import { Housing, isHousing } from '../types/index.js';

export const parseHousing = (value: string) => {
  if (!isHousing(value)) {
    throw new Error(`Invalid housing type: ${value}`);
  }

  const housing: Housing = value;
  return housing;
};
