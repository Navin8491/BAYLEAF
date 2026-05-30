import { supabase } from '../database/supabase';
import { ServiceResponse, Product } from '../types';

/**
 * Fetches all available products/menu items from public.menu_items.
 */
export const getProducts = async (): Promise<ServiceResponse<Product[]>> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return { success: true, data: data as Product[] };
  } catch (err: any) {
    console.error('Fetch Products Error:', err);
    return { success: false, message: err.message || 'Could not load menu items.' };
  }
};

/**
 * Fetches menu items belonging to a specific category.
 */
export const getProductsByCategory = async (category: string): Promise<ServiceResponse<Product[]>> => {
  if (!category) {
    return { success: false, message: 'Category identifier is required.' };
  }

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .eq('available', true);

    if (error) throw error;
    return { success: true, data: data as Product[] };
  } catch (err: any) {
    console.error(`Fetch Products By Category (${category}) Error:`, err);
    return { success: false, message: err.message || `Could not load menu items for category: ${category}` };
  }
};
