import { SupabaseService } from "../services/SupabaseService";
import { SendEmailService } from '../services/SendEmailService';
import { adminModel, createdAdminPasswordEmail } from "../models/adminModels";
import { emailDataModel } from "../models/emailDataModel";

export class AdministratorController {
    private supabase: any;
    private supabaseService!: SupabaseService;
    private sendEmailService!: SendEmailService;

    constructor () {
        this.supabaseService = SupabaseService.getInstance();
        this.supabase = this.supabaseService.createdClient;
        this.sendEmailService = SendEmailService.getInstance();
    }

    /* Function to generate a random password:
    ===========================================================================*/
        generateRandomPassword(length: number): string {
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
        async createAdministrator(adminObj: adminModel) {
            /* Setting role for admin:
            ===================================================================*/
                adminObj.role = 'administrator';

            /* Generate a random password for the new administrator:
            ===================================================================*/
                const password = this.generateRandomPassword(12);

            /* Create user in Supabase Auth:
                - Using the email that comes like parameter.
                - Using the password that its randomly generated.
            ===================================================================*/
                const { data, error } = await this.supabase.auth.signUp({
                    email: adminObj.email,
                    password: password,
                });

                if (error) {
                    return `Error while creating user: ${error.message}`;
                }

            /* If user creation is successful, insert data into adm table:
                - Using the name and email that comes like parameters.
            ===================================================================*/
                const { data: insertData, error: insertError } = await this.supabase
                    .from('users')
                    .insert([
                        { name: adminObj.name, email: adminObj.email, phone: adminObj.phone, role: adminObj.role },
                    ]);

                if (insertError) {
                    return 'Error inserting administrator data:' + insertError.message;

                } else {
                    await this.sendAdminPass(adminObj.email, password);
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

    /* Function to return one admin by email:
    ===========================================================================*/
        async getAdmin(email: string) {
            const { data, error } = await this.supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('role', 'administrator')
                .single(); // Use .single() if you're expecting at most one record
        
            if (error) {
                // Return an object with an error key if there's an error
                return { error: error.message };
            } else if (!data) {
                // Handle the case where no matching data is found
                return { error: 'No administrator found with the given name.' };
            } else {
                // Return an object with a data key if the fetch is successful
                return { data };
            }
        }
    
    /* Function to send admin password by email:
    ===========================================================================*/
        async sendAdminPass(admEmail: string, password: string) {
            const imgPath = "https://github.com/ic-platform/confluentia/blob/henry-alt/src/assets/images/App%20Icons%20PNG/256x256.png?raw=true";
            const emailData: Partial<emailDataModel> = {
                to: admEmail,
                subject: 'Confluentia - Dados de Login de Administrador',
                html: createdAdminPasswordEmail(password, imgPath),
            };

            return this.sendEmailService.sendEmail(emailData);
        }
        
    /* Function to edit admin data on DB:
    ===========================================================================*/
        async updateAdmin(adminObj: adminModel) {
            /* Setting role for admin:
            ===================================================================*/
                adminObj.role = 'administrator';

            /* Updating data in supabase:
            ===================================================================*/
                const { data, error } = await this.supabase
                   .from('users')
                   .update(adminObj)
                   .eq('email', adminObj.email)
                   .single();

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
        }

    /* Function to delete admin data from DB:
    ===========================================================================*/
        async deleteAdmin(email: string) {
            const { data, error } = await this.supabase
               .from('users')
               .delete()
               .eq('email', email);

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }   
}