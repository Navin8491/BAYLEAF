import { supabase } from '../lib/supabase';

/**
 * Inserts a new order into public.orders.
 */
export const createOrder = async ({ userId, totalAmount }) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        status: 'Pending'
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Database Create Order Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Batch inserts order items into public.order_items.
 */
export const createOrderItems = async (orderItems) => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Database Create Order Items Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Queries all orders and order items for a specific user.
 */
export const getUserOrders = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        total_amount,
        status,
        created_at,
        order_items (
          id,
          product_name,
          quantity,
          price
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Database Fetch User Orders Error:', err);
    return { success: false, message: err.message };
  }
};
