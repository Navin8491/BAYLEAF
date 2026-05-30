import { supabase } from '../database/supabase';
import { ServiceResponse, OrderCreationParams, OrderResponse, OrderItemParams, OrderItemResponse } from '../types';
import { validateOrderCreation, validateOrderItemsList } from '../validations/schemas';

/**
 * Inserts a new order into public.orders.
 */
export const createOrder = async (params: OrderCreationParams): Promise<ServiceResponse<OrderResponse>> => {
  const validation = validateOrderCreation(params);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  const { userId, totalAmount, shippingAddress } = params;

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
  const validation = validateOrderItemsList(orderItems);
  if (!validation.valid) {
    return { success: false, message: validation.message };
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
