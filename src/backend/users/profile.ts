import { supabase } from '../database/supabase';
import { ServiceResponse, UserProfileUpdateParams, UserProfileResponse } from '../types';

/**
 * Fetches the user profile from public.users table.
 */
export const getUserProfile = async (userId: string): Promise<ServiceResponse<UserProfileResponse>> => {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return { success: true, data: data as UserProfileResponse };
  } catch (err: any) {
    console.error('Fetch Profile Error:', err);
    return { success: false, message: err.message || 'Could not fetch user profile details.' };
  }
};

/**
 * Updates user profile details in public.users.
 */
export const updateUserProfile = async (userId: string, { name, phone, avatar }: UserProfileUpdateParams): Promise<ServiceResponse> => {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }
  if (!name.trim()) {
    return { success: false, message: 'Profile full name cannot be blank.' };
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({
        full_name: name.trim(),
        phone: phone?.trim() || '',
        avatar_url: avatar || ''
      })
      .eq('id', userId);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Update Profile Error:', err);
    return { success: false, message: err.message || 'Profile changes saving failed.' };
  }
};

/**
 * Uploads a profile image file to Supabase Storage avatars bucket.
 */
export const uploadUserAvatar = async (userId: string, file: File): Promise<ServiceResponse<string>> => {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }
  if (!file) {
    return { success: false, message: 'No image file provided.' };
  }

  try {
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return { success: true, data: publicUrl };
  } catch (err: any) {
    console.error('Storage Upload Error:', err);
    return { success: false, message: err.message || 'Avatar file upload failed.' };
  }
};
