/* Imports:
================================================================================*/
    import { SupabaseService } from './SupabaseService';

/* Class:
================================================================================*/
    export class ChangePasswordService {
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
            private static instance: ChangePasswordService;
        
            static getInstance() {
                if (!ChangePasswordService.instance) {
                    ChangePasswordService.instance = new ChangePasswordService();
                }

                return ChangePasswordService.instance;
            }

        /* Function to change password:
        ========================================================================*/
            public async changePassword(newPassword: string, accessToken: string): Promise<string> {
                const { error } = await this.supabase.auth.updateUser(accessToken, {
                    password: newPassword
                });

                if (error) throw new Error(error.message);

                return "Password changed successfully!";
            }
    }