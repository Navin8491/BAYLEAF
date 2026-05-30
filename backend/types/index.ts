import { User } from '@supabase/supabase-js';

// Generic Service Response Type
export interface ServiceResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// Authentication Types
export interface UserSignUpParams {
  email: string;
  password?: string;
  name: string;
  phone?: string;
}

export interface UserSignInParams {
  email: string;
  password?: string;
}

// Profile/User Types
export interface UserProfileUpdateParams {
  name: string;
  phone?: string;
  avatar?: string;
}

export interface UserProfileResponse {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role?: string;
  last_login?: string;
  created_at: string;
}

// Order Types
export interface OrderCreationParams {
  userId: string;
  totalAmount: number;
  shippingAddress?: string;
}

export interface OrderItemParams {
  order_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface OrderItemResponse {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
  payment_status: string;
  delivery_status: string;
  shipping_address?: string;
  created_at: string;
  order_items: OrderItemResponse[];
}

// Product/Menu Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  badge?: string;
  stock_quantity?: number;
  available?: boolean;
  created_at?: string;
}

// Contact Inquiry Types
export interface ContactMessageParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Blog Post Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  tags?: string[];
  published?: boolean;
  created_at: string;
}
