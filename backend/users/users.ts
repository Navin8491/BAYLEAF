import { supabase } from '../database/supabase';
import { ServiceResponse, UserProfileResponse } from '../types';

/**
 * Ensures that a user profile exists in the users table for the authenticated user session.
 * Creates one if missing.
 */
export const syncUserSessionProfile = async (userId: string, email: string, name: string): Promise<ServiceResponse<UserProfileResponse>> => {
  if (!userId || !email) {
    return { success: false, message: 'Invalid session details for synchronization.' };
  }

  try {
    console.log('Query SELECT users: [Before fetch]');
    const { data: profile, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    console.log('Query SELECT users: [After fetch]');
    console.log('Query SELECT users: [Data]', profile);

    if (selectError) {
      console.log('Query SELECT users: [Error]', selectError);
      throw selectError;
    }

    if (profile) {
      return { success: true, data: profile as UserProfileResponse };
    }

    // Insert missing profile
    console.log('Query INSERT users: [Before fetch]');
    const { data: newProfile, error: insertError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: email,
        full_name: name || email.split('@')[0],
        avatar_url: ''
      })
      .select()
      .single();
    console.log('Query INSERT users: [After fetch]');
    console.log('Query INSERT users: [Data]', newProfile);

    if (insertError) {
      console.log('Query INSERT users: [Error]', insertError);
      throw insertError;
    }

    return { success: true, data: newProfile as UserProfileResponse };
  } catch (err: any) {
    console.error('Sync User Profile Error:', err);
    return { success: false, message: err.message || 'Could not synchronize user session profile.' };
  }
};
