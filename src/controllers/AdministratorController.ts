import axios from "axios";
import { SupabaseService } from "../services/SupabaseService";

export class AdministratorController {
    private supabase: any;

    constructor (private Supabase: SupabaseService) {
        this.supabase = Supabase.createdClient();
     }

    /* Function to generate a random password:
    ===========================================================================*/
        generateRandomPassword(length) {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let password = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            
            return password;
        }
    
    /* Function to create an Administrator:
        - It will generate a new password randomly.
            -- The password will have an length of 12 characters.
        - It will create the new user on Supabase Auth.
            -- With the email and password generated.
        - It will associate this new user data into the administrator database.
            -- With the email and email that comes like parameters.
    ===========================================================================*/
        async createAdministrator(admName, admEmail) {

            /* Generate a random password for the new administrator:
            ===================================================================*/
                const password = this.generateRandomPassword(12);

            /* Create user in Supabase Auth:
                - Using the email that comes like parameter.
                - Using the password that its randomly generated.
            ===================================================================*/
                const { data, error } = await this.supabase.auth.signUp({
                    email: admEmail,
                    password: password,
                });

                if (error) {
                    return 'Error creating user:' + error.message;
                }

            /* If user creation is successful, insert data into adm table:
                - Using the name and email that comes like parameters.
            ===================================================================*/
                const { data: insertData, error: insertError } = await this.supabase
                    .from('users')
                    .insert([
                        { name: admName, email: admEmail, phone: '', role: 'administrator' },
                    ]);

                if (insertError) {
                    return 'Error inserting administrator data:' + insertError.message;

                } else {
                    await this.sendAdminPass(admEmail, password);
                    return "Success creating administrator. \nData used: " + insertData;
                }
        }

    /* Function to return all the administrators:
    ===========================================================================*/
        async getAllAdministrators() {
            const { data, error } = await this.supabase
                .from('users')
                .select('*')
                .eq('role', 'administrator');
            
            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }
    
    /* Function to send admin password by email:
    ===========================================================================*/
        async sendAdminPass(admEmail, password) {
                axios.post('https://api.sendgrid.com/v3/mail/send', {})
        }
}