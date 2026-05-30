import { supabase } from '../database/supabase';
import { ServiceResponse, ContactMessageParams } from '../types';
import { validateContactMessage } from '../validations/schemas';

/**
 * Inserts a contact form inquiry into public.contact_messages.
 */
export const submitContactMessage = async (params: ContactMessageParams): Promise<ServiceResponse> => {
  const validation = validateContactMessage(params);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  const { name, email, phone, message } = params;

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
    console.error('Submit Contact Message Error:', err);
    return { success: false, message: err.message || 'Could not send your message. Please try again later.' };
  }
};
