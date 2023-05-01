/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { Event } from './event';
import type { User } from './user';

export interface EventAttendance {
  id?: string;
  date?: string;
  description?: string;
  name?: string;
  activated?: boolean;
  creatorID?: string;
  created?: string;
  eventId?: string;
  attendeeID?: string;
  event?: Event;
  attendee?: User;
}
