import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ozukybxxvayqutjlhmwk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dWt5Ynh4dmF5cXV0amxobXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDIyMjMsImV4cCI6MjA2MDIxODIyM30.hrjgiTgtqMMRKB5-xBKFNUr5xjVGEWY-F_cUPl4VyVI'

export const supabase = createClient(supabaseUrl, supabaseKey)
