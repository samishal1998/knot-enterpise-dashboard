/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { PrismaDateTimeNullableFilterNot } from './prismaDateTimeNullableFilterNot';

export interface PrismaDateTimeNullableFilter {
  equals?: string;
  in?: string;
  notIn?: string[];
  lt?: string[];
  lte?: string;
  gt?: string;
  gte?: string;
  not?: PrismaDateTimeNullableFilterNot;
  isSet?: boolean;
}