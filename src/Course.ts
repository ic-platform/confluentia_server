import { Supabase } from "./supabase";

export class Course {
    private supabase: any;

    constructor(private Supabase: Supabase) {
        this.supabase = Supabase.createdClient();
    }

    /* Creating a Course:
        - courseName: Course name.
        - duration: Duration in hours of the course.
        - levelId: Id of the type of level associated with the course.
        - description: Description of the course.
        - tags: Array of tags associated with the course.
    ===========================================================================*/
        async createCourse(courseName, duration, levelId, description, tags) {
            const { data, error } = await this.supabase
                .from('courses')
                .insert([{ courseName, duration, levelId, description, tags }])
                .single();
            
            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Getting Levels IDs and its associations:
        - Returns the id_level and type of the levels.
        - Type consists in a string type and can be 'Beginner',
        'Intermediate' or 'Advanced'.
    ===========================================================================*/
        async getLevels() {
            const { data, error } = await this.supabase
                .from('levels')
                .select('id_level, type');
            
            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Creating a New Module:
        - moduleName: Name of the module.
        - courseId: Id of the course to which the module belongs.
    ===========================================================================*/
        async createModule(moduleName, courseId) {
            const { data, error } = await this.supabase
                .from('modules')
                .insert([{ moduleName, courseId }])
                .single();
            
            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }


    /* Creating a New Lesson:
        - Name: Name of the lesson.
        - Description: Description of the lesson.
        - resourcesURL: array of URLs of the resources for the lesson.
        - moduleId: Id of the module to which the lesson belongs.
    ===========================================================================*/
        async createLesson(name, description, resourcesURL, moduleId) {
            const { data, error } = await this.supabase
                .from('lessons')
                .insert([{ name, description, resourcesURL, moduleId }])
                .single();
            
            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }
}