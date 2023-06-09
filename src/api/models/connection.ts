/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { User } from './user';

export interface Connection {
  id?: string;
  createdAt?: string;
  responseAt?: string;
  seen?: boolean;
  seenAt?: string;
  response?: string;
  initiatedByID?: string;
  receivedByID?: string;
  blockerID?: string;
  initiatedBy?: User;
  receivedBy?: User;
  blocker?: User;
}
