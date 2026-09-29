import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xfkcnmhophacnluofauu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2NubWhvcGhhY25sdW9mYXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5OTI2NzcsImV4cCI6MjEwMzU2ODY3N30.gqApRPsnJeFcOVk1XQnQiw_GSii3W1FszzfsBud4K-Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
