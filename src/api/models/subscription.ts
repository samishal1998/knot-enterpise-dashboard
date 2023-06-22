/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { Payment } from './payment';
import type { Distributor } from './distributor';

export interface Subscription {
  active?: boolean;
  createdAt?: string;
  duration?: number;
  endDate?: string;
  id: string;
  nextSubscriptionId?: string;
  payment?: Payment;
  paymentFinalized?: boolean;
  paymentId?: string;
  previousSubscriptionId?: string;
  price?: number;
  subscriber?: Distributor;
  subscriberId?: string;
}