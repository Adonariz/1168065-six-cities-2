import {
  createStringUnionGuard,
  createStringUnionParser,
} from '../helpers/index.js';

export const HousingValues = ['apartment', 'house', 'room', 'hotel'] as const;

export type Housing = (typeof HousingValues)[number];

export const isHousing = createStringUnionGuard(HousingValues);

export const parseHousing = createStringUnionParser(HousingValues);
