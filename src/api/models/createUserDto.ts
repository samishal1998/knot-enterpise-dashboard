/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import type { CreateUserDtoUserType } from './createUserDtoUserType';
import type { BusinessDetails } from './businessDetails';

export interface CreateUserDto {
  id?: string;
  createdAt?: string;
  firebaseUID: string;
  email?: string;
  phone?: string;
  fullName?: string;
  userType?: CreateUserDtoUserType;
  birthday?: string;
  businessDetails?: BusinessDetails;
  bio?: string;
  address?: string;
}