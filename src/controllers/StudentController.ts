import { createStudentModel, editStudentModel } from "../models/studentModels";
import { SupabaseService } from '../services/SupabaseService';

export class StudentController {
    private supabase: any;
    private supabaseService!: SupabaseService;

    constructor() {
        this.supabaseService = SupabaseService.getInstance();
        this.supabase = this.supabaseService.createdClient;
    }

    /* Creating a Student:
        - Receives the data from the Frontend and creates after successuflly checking if the user already exists and its created on auth.
        - Inserts the student data into the 'users' table with the role 'student'.
    ===========================================================================*/
        async createStudent(studentObj: createStudentModel) {
            // Check if user already exists
                const { data: existingUser, error: existingUserError } = await this.supabase
                    .from('users')
                    .select('email')
                    .eq('email', studentObj.email)
                    .single();
            
                if (existingUserError && existingUserError.message !== "No rows found") {
                    return { success: false, message: 'Error checking existing user: ' + existingUserError.message };
                }
            
                if (existingUser) {
                    return { success: false, message: 'User already exists' };
                }
        
            // User does not exist, proceed with creation
                // Making sure that the role is correct associated:
                    studentObj.role = 'student';
                // Creating user:
                    const { data: insertData, error: insertError } = await this.supabase
                        .from('users')
                        .insert([{ name: studentObj.name, email: studentObj.email, phone: studentObj.phone, role: studentObj.role }])
                        .single();
                
                    if (insertError) {
                        return { success: false, message: 'Error inserting student data: ' + insertError.message };
                        
                    } else {
                        return {
                            success: true,
                            data: insertData,
                            message: 'Student created successfully'
                        };
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

    /* Updating student user data:
        - Updates the student data in the 'users' table.
    ===========================================================================*/
        async updateStudent(studentObj: editStudentModel) {
            /* Setting the role for student:
            ===================================================================*/
                studentObj.role = 'student';

            /* Update student data in the 'users' table:
            ===================================================================*/
                const { data, error } = await this.supabase
                    .from('users')
                    .update({ name: studentObj.name, email: studentObj.email, phone: studentObj.phone, role: studentObj.role })
                    .eq('email', studentObj.email);

                if (error) {
                    return { success: false, message: 'Error updating student data: ' + error.message };

                } else {
                    return { success: true, message: 'Student data updated successfully' };
                }
        }

    /* Deleting a student:
        - Deletes the student user from the 'users' table.
    ===========================================================================*/
        async deleteStudent(email: string) {
            const { data, error } = await this.supabase
                .from('users')
                .delete()
                .eq('email', email);

            if (error) {
                return { success: false, message: 'Error deleting student: ' + error.message };

            } else {
                return { success: true, message: 'Student deleted successfully' };
            }
        }
}
