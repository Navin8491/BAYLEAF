import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config/env';

export const supabase: SupabaseClient = createClient(config.supabaseUrl, config.supabaseAnonKey);
