import { createClient } from '@supabase/supabase-js'

export class Supabase {
    /* Global Variables:
    ============================================================================*/
        private supabaseUrl: string;
        private supabaseKey: string;
        private supabase: any;

    /* Constructor:
    ============================================================================*/
        constructor () {
            this.supabaseUrl = process.env.SUPABASE_URL || '';
            this.supabaseKey = process.env.SUPABASE_KEY || '';
            this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
        }
    
    /* Getting the client created on constructor:
    ============================================================================*/
        get createdClient() {
            return this.supabase;
        }
}