import { supabase } from '../database/supabase';
import { ServiceResponse, OrderCreationParams, OrderResponse, OrderItemParams, OrderItemResponse } from '../types';

/**
 * Inserts a new order into public.orders.
 */
export const createOrder = async ({ userId, totalAmount, shippingAddress }: OrderCreationParams): Promise<ServiceResponse<OrderResponse>> => {
  if (!userId) {
    return { success: false, message: 'User authentication ID is required.' };
  }
  if (totalAmount <= 0) {
    return { success: false, message: 'Total order amount must be greater than zero.' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        status: 'Pending',
        payment_status: 'Pending',
        delivery_status: 'Pending',
        shipping_address: shippingAddress || ''
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data: data as OrderResponse };
  } catch (err: any) {
    console.error('Create Order Error:', err);
    return { success: false, message: err.message || 'Failed to initialize checkout transaction.' };
  }
};

/**
 * Batch inserts order items into public.order_items.
 */
export const createOrderItems = async (orderItems: OrderItemParams[]): Promise<ServiceResponse<OrderItemResponse[]>> => {
  if (!orderItems || orderItems.length === 0) {
    return { success: false, message: 'No items in order payload.' };
  }

  try {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (error) throw error;

    return { success: true, data: data as OrderItemResponse[] };
  } catch (err: any) {
    console.error('Create Order Items Error:', err);
    return { success: false, message: err.message || 'Failed to save items in checkout record.' };
  }
};

/**
 * Queries all orders and order items for a specific user.
 */
export const getUserOrders = async (userId: string): Promise<ServiceResponse<OrderResponse[]>> => {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        total_amount,
        status,
        payment_status,
        delivery_status,
        shipping_address,
        created_at,
        order_items (
          id,
          order_id,
          product_name,
          quantity,
          price
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data: data as unknown as OrderResponse[] };
  } catch (err: any) {
    console.error('Fetch Orders Error:', err);
    return { success: false, message: err.message || 'Could not fetch order transaction records.' };
  }
};
