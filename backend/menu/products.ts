import { supabase } from '../database/supabase';
import { ServiceResponse, Product } from '../types';

/**
 * Fetches all available products/menu items from public.menu_items.
 */
export const getProducts = async (): Promise<ServiceResponse<Product[]>> => {
  try {
    console.log('Query SELECT menu_items: [Before fetch]');
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('name', { ascending: true });
    console.log('Query SELECT menu_items: [After fetch]');
    console.log('Query SELECT menu_items: [Data]', data);

    if (error) {
      console.log('Query SELECT menu_items: [Error]', error);
      throw error;
    }
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
    console.log(`Query SELECT menu_items category ${category}: [Before fetch]`);
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .eq('available', true);
    console.log(`Query SELECT menu_items category ${category}: [After fetch]`);
    console.log(`Query SELECT menu_items category ${category}: [Data]`, data);

    if (error) {
      console.log(`Query SELECT menu_items category ${category}: [Error]`, error);
      throw error;
    }
    return { success: true, data: data as Product[] };
  } catch (err: any) {
    console.error(`Fetch Products By Category (${category}) Error:`, err);
    return { success: false, message: err.message || `Could not load menu items for category: ${category}` };
  }
};
