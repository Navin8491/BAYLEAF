import { UserSignUpParams, UserSignInParams, UserProfileUpdateParams, ContactMessageParams, OrderCreationParams, OrderItemParams } from '../types';

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

/**
 * Validates parameters for creating a new order.
 */
export const validateOrderCreation = (params: OrderCreationParams): { valid: boolean; message?: string } => {
  if (!params.userId) {
    return { valid: false, message: 'User authentication ID is required.' };
  }
  if (params.totalAmount <= 0) {
    return { valid: false, message: 'Total order amount must be greater than zero.' };
  }
  return { valid: true };
};

/**
 * Validates list of items within an order submission.
 */
export const validateOrderItemsList = (items: OrderItemParams[]): { valid: boolean; message?: string } => {
  if (!items || items.length === 0) {
    return { valid: false, message: 'No items in order payload.' };
  }
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.product_name || !item.product_name.trim()) {
      return { valid: false, message: `Product name at index ${i} is invalid.` };
    }
    if (item.quantity <= 0) {
      return { valid: false, message: `Quantity for product "${item.product_name}" must be greater than zero.` };
    }
    if (item.price < 0) {
      return { valid: false, message: `Price for product "${item.product_name}" cannot be negative.` };
    }
  }
  return { valid: true };
};

