import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://acdgcflrpscatbqrkget.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZGdjZmxycHNjYXRicXJrZ2V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NDQwNjcsImV4cCI6MjEwNTEyMDA2N30.ea07qYlZy4amiC5rEeJH7i58wLuq1zrPsDOiqOY4jyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
