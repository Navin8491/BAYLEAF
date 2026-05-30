import { supabase } from '../database/supabase';
import { ServiceResponse } from '../types';

/**
 * Checks if the current user session is authenticated.
 * Can be called before executing sensitive database writes.
 */
export const requireAuth = async (): Promise<ServiceResponse<{ userId: string }>> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session || !session.user) {
      return { success: false, message: 'Access denied. User session is unauthenticated.' };
    }
    
    return { success: true, data: { userId: session.user.id } };
  } catch (err: any) {
    return { success: false, message: err.message || 'Error occurred while verifying authentication.' };
  }
};
