/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { PaymentCount } from './paymentCount';
import type { Product } from './product';
import type { PaymentGateway } from './paymentGateway';

export interface Payment {
  id: string;
  _count?: PaymentCount;
  products?: Product[];
  gateway: PaymentGateway;
  payerId: string;
  payerType: string;
  paymentGatewayOid: string;
  status: string;
}
