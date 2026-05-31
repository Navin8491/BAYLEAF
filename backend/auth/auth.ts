import { supabase } from '../database/supabase';
import { User } from '@supabase/supabase-js';
import { UserSignUpParams, UserSignInParams, ServiceResponse } from '../types';
import { validateSignUp, validateSignIn } from '../validations/schemas';

/**
 * Registers a new user with Supabase Auth.
 * Triggers automatic database profile record creation.
 */
export const signUpUser = async (params: UserSignUpParams): Promise<ServiceResponse<User>> => {
  const validation = validateSignUp(params);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  const { email, password, name, phone } = params;

  try {
    console.log('Query auth.signUp: [Before fetch]');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name.trim(),
          phone: phone?.trim() || ''
        }
      }
    });
    console.log('Query auth.signUp: [After fetch]');
    console.log('Query auth.signUp: [Data]', data);
    if (error) {
      console.log('Query auth.signUp: [Error]', error);
      throw error;
    }
    if (!data.user) throw new Error('No user account data returned.');

    // Save initial login timestamp in user profile
    console.log('Query UPDATE users last_login: [Before fetch]');
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);
    console.log('Query UPDATE users last_login: [After fetch]');
    console.log('Query UPDATE users last_login: [Data]', updateData);
    if (updateError) {
      console.log('Query UPDATE users last_login: [Error]', updateError);
    }

    return { success: true, data: data.user };
  } catch (err: any) {
    console.error('Auth SignUp Error:', err);
    return { success: false, message: err.message || 'An error occurred during account creation.' };
  }
};

/**
 * Logs in a user using email and password.
 */
export const signInUser = async (params: UserSignInParams): Promise<ServiceResponse<{ user: User | null }>> => {
  const validation = validateSignIn(params);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  const { email, password } = params;

  try {
    console.log('Query auth.signInWithPassword: [Before fetch]');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    console.log('Query auth.signInWithPassword: [After fetch]');
    console.log('Query auth.signInWithPassword: [Data]', data);
    if (error) {
      console.log('Query auth.signInWithPassword: [Error]', error);
      throw error;
    }

    if (data.user) {
      // Update last login timestamp
      console.log('Query UPDATE users last_login: [Before fetch]');
      const { data: updateData, error: updateError } = await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);
      console.log('Query UPDATE users last_login: [After fetch]');
      console.log('Query UPDATE users last_login: [Data]', updateData);
      if (updateError) {
        console.log('Query UPDATE users last_login: [Error]', updateError);
      }
    }

    return { success: true, data: { user: data.user } };
  } catch (err: any) {
    console.error('Auth SignIn Error:', err);
    return { success: false, message: err.message || 'Authentication credentials rejected.' };
  }
};

/**
 * Logs out the active user session.
 */
export const signOutUser = async (): Promise<ServiceResponse> => {
  try {
    console.log('Query auth.signOut: [Before fetch]');
    const { error } = await supabase.auth.signOut();
    console.log('Query auth.signOut: [After fetch]');
    if (error) {
      console.log('Query auth.signOut: [Error]', error);
      throw error;
    }
    console.log('Query auth.signOut: [Data] Sign out successful');
    return { success: true };
  } catch (err: any) {
    console.error('Auth SignOut Error:', err);
    return { success: false, message: err.message || 'Could not sign out session.' };
  }
};
