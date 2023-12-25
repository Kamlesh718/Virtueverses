import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://raymmcduamnkukabwhwr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJheW1tY2R1YW1ua3VrYWJ3aHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwNzgwNjIsImV4cCI6MjAxODY1NDA2Mn0.5Tey1-_ohIK-uqwO9l5EuPy_obdr0MmcGU0uidmFonM";
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabase);

export default supabase;
