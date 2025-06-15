import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://snljaavyjcvkqogtkcov.supabase.co'; // <-- Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNubGphYXZ5amN2a3FvZ3RrY292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMTQyMTMsImV4cCI6MjA2NDU5MDIxM30.-VyxgpLiellG3Rkc8WORRWctlb6fJi8t9JgKc77U11Y'; // <-- Replace with your Supabase anon/public API key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
