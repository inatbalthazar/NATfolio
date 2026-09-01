import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efuvwyfvwxcbgrurrbko.supabase.co';
const supabaseAnonKey = 'sb_publishable_48dtgikXwxdANmwp9GC-4w_SLFU77h2';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
