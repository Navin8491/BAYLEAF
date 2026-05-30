import { UserSignUpParams, UserSignInParams, UserProfileUpdateParams, ContactMessageParams } from '../types';

/**
 * Validates an email address string.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates input parameters for signing up a new user.
 */
export const validateSignUp = (params: UserSignUpParams): { valid: boolean; message?: string } => {
  if (!params.name || !params.name.trim()) {
    return { valid: false, message: 'Full name is required.' };
  }
  if (!params.email || !params.email.trim() || !isValidEmail(params.email)) {
    return { valid: false, message: 'A valid email address is required.' };
  }
  if (!params.password || params.password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long.' };
  }
  return { valid: true };
};

/**
 * Validates input parameters for signing in an existing user.
 */
export const validateSignIn = (params: UserSignInParams): { valid: boolean; message?: string } => {
  if (!params.email || !params.email.trim() || !isValidEmail(params.email)) {
    return { valid: false, message: 'A valid email address is required.' };
  }
  if (!params.password) {
    return { valid: false, message: 'Password is required.' };
  }
  return { valid: true };
};

/**
 * Validates profile update parameters.
 */
export const validateProfileUpdate = (params: UserProfileUpdateParams): { valid: boolean; message?: string } => {
  if (!params.name || !params.name.trim()) {
    return { valid: false, message: 'Profile full name cannot be blank.' };
  }
  return { valid: true };
};

/**
 * Validates contact form submission inputs.
 */
export const validateContactMessage = (params: ContactMessageParams): { valid: boolean; message?: string } => {
  if (!params.name || !params.name.trim()) {
    return { valid: false, message: 'Name is required.' };
  }
  if (!params.email || !params.email.trim() || !isValidEmail(params.email)) {
    return { valid: false, message: 'A valid email address is required.' };
  }
  if (!params.message || !params.message.trim()) {
    return { valid: false, message: 'Message content cannot be empty.' };
  }
  return { valid: true };
};
