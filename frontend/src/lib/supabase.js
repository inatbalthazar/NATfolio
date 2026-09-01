import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efuvwyfvwxcbgrurrbko.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdXZ3eWZ2d3hjYmdydXJyYmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNzc1OTcsImV4cCI6MjEwMzg1MzU5N30.ZGnRxI6RMkPNDnHF5f4dpKVYAS6Re3wCyz1LDBIGgTI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
