/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { User } from './user';
import type { Event } from './event';

export interface EventOrganizer {
  id?: string;
  createdAt?: string;
  fullName?: string;
  user?: User;
  eventsCreated?: Event[];
}