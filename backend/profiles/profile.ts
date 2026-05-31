import { supabase } from '../database/supabase';
import { ServiceResponse, UserProfileUpdateParams, UserProfileResponse } from '../types';
import { validateProfileUpdate } from '../validations/schemas';

/**
 * Fetches the user profile from public.users table.
 */
export const getUserProfile = async (userId: string): Promise<ServiceResponse<UserProfileResponse>> => {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }

  try {
    console.log('Query SELECT users profile: [Before fetch]');
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    console.log('Query SELECT users profile: [After fetch]');
    console.log('Query SELECT users profile: [Data]', data);

    if (error) {
      console.log('Query SELECT users profile: [Error]', error);
      throw error;
    }

    return { success: true, data: data as UserProfileResponse };
  } catch (err: any) {
    console.error('Fetch Profile Error:', err);
    return { success: false, message: err.message || 'Could not fetch user profile details.' };
  }
};

/**
 * Updates user profile details in public.users.
 */
export const updateUserProfile = async (userId: string, params: UserProfileUpdateParams): Promise<ServiceResponse> => {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }
  
  const validation = validateProfileUpdate(params);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  const { name, phone, avatar } = params;

  try {
    console.log('Query UPDATE users profile: [Before fetch]');
    const { data, error } = await supabase
      .from('users')
      .update({
        full_name: name.trim(),
        phone: phone?.trim() || '',
        avatar_url: avatar || ''
      })
      .eq('id', userId)
      .select();
    console.log('Query UPDATE users profile: [After fetch]');
    console.log('Query UPDATE users profile: [Data]', data);

    if (error) {
      console.log('Query UPDATE users profile: [Error]', error);
      throw error;
    }
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

    console.log('Query STORAGE upload avatar: [Before fetch]');
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    console.log('Query STORAGE upload avatar: [After fetch]');
    console.log('Query STORAGE upload avatar: [Data]', data);

    if (error) {
      console.log('Query STORAGE upload avatar: [Error]', error);
      throw error;
    }

    // Get public URL
    console.log('Query STORAGE getPublicUrl avatar: [Before fetch]');
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    console.log('Query STORAGE getPublicUrl avatar: [After fetch]');
    console.log('Query STORAGE getPublicUrl avatar: [Data]', publicUrl);

    return { success: true, data: publicUrl };
  } catch (err: any) {
    console.error('Storage Upload Error:', err);
    return { success: false, message: err.message || 'Avatar file upload failed.' };
  }
};
