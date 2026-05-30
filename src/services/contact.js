import { supabase } from '../lib/supabase';

/**
 * Inserts a contact form inquiry into public.contact_messages.
 */
export const submitContactMessage = async ({ name, email, phone, message }) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone,
        message
      });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Database Submit Contact Message Error:', err);
    return { success: false, message: err.message };
  }
};
