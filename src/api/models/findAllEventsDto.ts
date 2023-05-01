/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { FindAllEventsDtoDate } from './findAllEventsDtoDate';
import type { FindAllEventsDtoCreatorID } from './findAllEventsDtoCreatorID';
import type { PrismaStringNullableListFilter } from './prismaStringNullableListFilter';
import type { PrismaStringFilter } from './prismaStringFilter';

export interface FindAllEventsDto {
  date?: FindAllEventsDtoDate;
  activated?: boolean;
  creatorID?: FindAllEventsDtoCreatorID;
  isFeatured?: boolean;
  tags?: PrismaStringNullableListFilter;
  category?: PrismaStringFilter;
}
