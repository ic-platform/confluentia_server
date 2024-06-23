import { createClient } from '@supabase/supabase-js'

export class Supabase {
    private supabaseUrl: string;
    private supabaseKey: string;
    private supabase: any;

    constructor () {
        this.supabaseUrl = process.env.SUPABASE_URL || '';
        this.supabaseKey = process.env.SUPABASE_KEY || '';
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    create() {
        return this.supabase;
    }
}