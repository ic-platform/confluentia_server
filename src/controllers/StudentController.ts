import { createStudentModel, editStudentModel } from "../models/studentModels";
import { SupabaseService } from "../services/SupabaseService";

export class StudentController {
    private supabase: any;

    constructor(private Supabase: SupabaseService) {
        this.supabase = Supabase.createdClient();
    }

    /* Creating a Student:
        - Creates the student user in Supabase Auth using the provided email and password.
        - Inserts the student data into the 'users' table with the role 'student'.
    ===========================================================================*/
        async createStudent(studentObj: createStudentModel) {
            /* Defining the role into the received object:
            =======================================================================*/
                studentObj.role = 'student';

            /* Create user in Supabase Auth using the email and provided password:
            =======================================================================*/
                const { data: authData, error: authError } = await this.supabase.auth.signUp({
                    email: studentObj.email,
                    password: studentObj.password,
                });

                if (authError) {
                    return { success: false, message: 'Error creating user: ' + authError.message };
                }
        
            /* Insert student data into the 'users' table:
            =======================================================================*/
                const { data: insertData, error: insertError } = await this.supabase
                    .from('users')
                    .insert([{ name: studentObj.name, email: studentObj.email, phone: studentObj.phone, role: studentObj.role }])
                    .single();
            
                if (insertError) {
                    return { success: false, message: 'Error inserting student data: ' + insertError.message };

                } else {
                    // Return success status, access token, and inserted data
                    return {
                        success: true,
                        accessToken: authData.session.access_token, // Ensure this is the correct path to the access token
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
