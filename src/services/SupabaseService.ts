import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

export class SupabaseService {
    /* Global Variables:
    ============================================================================*/
        private static instance: SupabaseService;
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
    
    /* Singleton:
    ============================================================================*/
        public static getInstance(): SupabaseService {
            if (!SupabaseService.instance) {
                SupabaseService.instance = new SupabaseService();
            }
            return SupabaseService.instance;
        }
    
    /* Getting the client created on constructor:
    ============================================================================*/
        get createdClient() {
            return this.supabase;
        }
}