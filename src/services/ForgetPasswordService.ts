/* Imports:
================================================================================*/
    import { SupabaseService } from './SupabaseService';

/* Class:
================================================================================*/
    export class ForgetPasswordService {
        /* Global Variables:
        ========================================================================*/
            private supabase: any;
            private supabaseService!: SupabaseService;

        /* Constructor:
        ========================================================================*/
            constructor() { 
                this.supabaseService = SupabaseService.getInstance();
                this.supabase = this.supabaseService.createdClient;
            }

        /* Singleton Instance for Class:
        ========================================================================*/
            private static instance: ForgetPasswordService;
            
            static getInstance() {
                if (!ForgetPasswordService.instance) {
                    ForgetPasswordService.instance = new ForgetPasswordService();
                }

                return ForgetPasswordService.instance;
            }

        /* Function to reset password:
        ========================================================================*/
            public async resetPassword(email: string): Promise<string> {
                const { data, error } = await this.supabase.auth.api.resetPasswordForEmail(email, {
                    //redirectTo: 'your-redirect-url-after-reset' // Optional: Specify a URL to redirect the user to after password reset
                });

                if (error) throw new Error(error.message);

                return "Password reset email sent successfully!";
            }
    }