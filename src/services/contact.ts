import { supabase } from '../lib/supabase';
import { ServiceResponse } from './auth';

// ----------------------------------------------------
// TypeScript Interfaces & Types
// ----------------------------------------------------

export interface ContactMessageParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// ----------------------------------------------------
// Backend Contact Services
// ----------------------------------------------------

/**
 * Inserts a contact form inquiry into public.contact_messages.
 */
export const submitContactMessage = async ({
  name,
  email,
  phone,
  message
}: ContactMessageParams): Promise<ServiceResponse> => {
  if (!name.trim()) {
    return { success: false, message: 'Name is required.' };
  }
  if (!email.trim()) {
    return { success: false, message: 'Email address is required.' };
  }
  if (!message.trim()) {
    return { success: false, message: 'Message content cannot be empty.' };
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        message: message.trim()
      });

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error('TypeScript Submit Contact Message Error:', err);
    return { success: false, message: err.message || 'Could not send your message. Please try again later.' };
  }
};
