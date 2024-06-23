import { Supabase } from "./supabase";

export class Student {
    private supabase: any;

    constructor(private Supabase: Supabase) {
        this.supabase = Supabase.create();
    }

    /* Creating a Student:
        - Creates the student user in Supabase Auth using the provided email and password.
        - Inserts the student data into the 'users' table with the role 'student'.
    ===========================================================================*/
    async createStudent(name: string, email: string, phone: string, password: string) {
        // Create user in Supabase Auth using the email and provided password
        const { data: authData, error: authError } = await this.supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) {
            return 'Error creating user:' + authError.message;
        }

        // Insert student data into the 'users' table
        const { data: insertData, error: insertError } = await this.supabase
            .from('users')
            .insert([{ name, email, phone, role: 'student' }])
            .single();

        if (insertError) {
            return 'Error inserting student data:' + insertError.message;
        } else {
            return "Success creating student. \nData used: " + JSON.stringify(insertData);
        }
    }

    /* Getting data of one student:
        - name: The name of the student
        - email: The email of the student
    ===========================================================================*/
    async getStudent(name?: string, email?: string) {
        let query = this.supabase
            .from('users')
            .select('*')
            .eq('role', 'student');

        if (name) {
            query = query.eq('name', name);
        }

        if (email) {
            query = query.eq('email', email);
        }

        const { data, error } = await query;

        if (error) {
            return { error: error.message };
        } else {
            return data;
        }
    }

    /* Fetching all Students:
        - Returns a list of all students.
    ===========================================================================*/
    async getAllStudents() {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('role', 'student');

        if (error) {
            return { error: error.message };
        } else {
            return data;
        }
    }
}
