/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { EventOrganizer } from './eventOrganizer';
import type { GeoPoint } from './geoPoint';
import type { EventAttendance } from './eventAttendance';
import type { EventCount } from './eventCount';

export interface Event {
  id?: string;
  date?: string;
  description?: string;
  name?: string;
  activated?: boolean;
  creatorID?: string;
  creator?: EventOrganizer;
  isFeatured?: boolean;
  tags?: string[];
  category?: string;
  duration?: number;
  eventUrl?: string;
  location?: GeoPoint;
  address?: string;
  attendees?: EventAttendance[];
  _count?: EventCount;
}
