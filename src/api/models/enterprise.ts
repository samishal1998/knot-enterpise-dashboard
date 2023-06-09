/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { EnterpriseMetaFieldsDeclarations } from './enterpriseMetaFieldsDeclarations';
import type { EnterpriseAccess } from './enterpriseAccess';
import type { Product } from './product';
import type { User } from './user';

export interface Enterprise {
  id: string;
  name?: string;
  url?: string;
  logo?: string;
  cover?: string;
  metaFieldsDeclarations?: EnterpriseMetaFieldsDeclarations;
  accessors?: EnterpriseAccess[];
  products?: Product[];
  employees?: User[];
}
