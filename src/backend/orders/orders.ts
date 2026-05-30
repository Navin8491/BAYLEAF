import { supabase } from '../database/supabase';
import { ServiceResponse, OrderResponse } from '../types';

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
