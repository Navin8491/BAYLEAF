import { supabase } from '../lib/supabase';

/**
 * Registers a new user with Supabase Auth.
 * Triggers automatic public.users profile row creation.
 */
export const signUpUser = async ({ email, password, name, phone }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone
        }
      }
    });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Database Auth SignUp Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Logs in a user using email and password.
 */
export const signInUser = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Database Auth SignIn Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Logs out the active user session.
 */
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Database Auth SignOut Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Fetches the user profile from public.users table.
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Database Fetch Profile Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Updates user profile details in public.users.
 */
export const updateUserProfile = async (userId, { name, phone, avatarUrl }) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        full_name: name,
        phone: phone,
        avatar_url: avatarUrl
      })
      .eq('id', userId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Database Update Profile Error:', err);
    return { success: false, message: err.message };
  }
};

/**
 * Uploads a profile image file to Supabase Storage avatars bucket.
 */
export const uploadUserAvatar = async (userId, file) => {
  try {
    const fileExt = file.name.split('.').pop();
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

    return { success: true, publicUrl };
  } catch (err) {
    console.error('Database Storage Upload Error:', err);
    return { success: false, message: err.message };
  }
};
