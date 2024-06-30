import { SupabaseService } from "../services/SupabaseService";
import { courseModel, lessonsModel, levelsModel, moduleModel } from '../models/courseModels';

export class CourseController {
    private supabase: any;
    private supabaseService!: SupabaseService;

    /* Global Variables:
    ===========================================================================*/
        levels!: levelsModel[];
    
    /* Constructor:
    ===========================================================================*/
        constructor() {
            this.supabaseService = SupabaseService.getInstance();
            this.supabase = this.supabaseService.createdClient();
            this.getLevels().then(levels => {
                this.levels = levels;
            });
        }

    /* Creating a Course:
        - courseName: Course name.
        - duration: Duration in hours of the course.
        - levelId: Id of the type of level associated with the course.
        - description: Description of the course.
        - tags: Array of tags associated with the course.
    ===========================================================================*/
        async createCourse( courseObj: courseModel ) {
            const { data, error } = await this.supabase
                .from('courses')
                .insert([{ courseName: courseObj.courseName, duration: courseObj.duration, levelId: courseObj.levelId, description: courseObj.description, tags: courseObj.tags }])
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
        - totalLessons: Number of lessons in the module.
    ===========================================================================*/
        async createModule( moduleObj: moduleModel ) {
            const { data, error } = await this.supabase
                .from('modules')
                .insert([{ name: moduleObj.moduleName, courseid: moduleObj.courseId, total_lessons: moduleObj.totalLessons }])
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
        async createLesson( lessonObj:lessonsModel ) {
            const { data, error } = await this.supabase
                .from('lessons')
                .insert([{ name: lessonObj.lessonName, description: lessonObj.description, resources_url: lessonObj.lessonUrl, moduleid: lessonObj.moduleId, lesson_url: lessonObj.lessonUrl }])
                .single();
            
            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Updating a Course:
        - courseId: ID of the course to update.
        - updateObj: Object containing the fields to update.
    ===========================================================================*/
        async updateCourse(courseId: number, updateObj: Partial<courseModel>) {
            const { data, error } = await this.supabase
                .from('courses')
                .update(updateObj)
                .match({ courseid: courseId });

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

    /* Deleting a Course:
        - courseId: ID of the course to delete.
    ===========================================================================*/
        async deleteCourse(courseId: number) {
            const { data, error } = await this.supabase
                .from('courses')
                .delete()
                .match({ courseid: courseId });

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Updating a Module:
        - moduleId: ID of the module to update.
        - updateObj: Object containing the fields to update.
    ===========================================================================*/
        async updateModule(moduleId: number, updateObj: Partial<moduleModel>) {
            const { data, error } = await this.supabase
                .from('modules')
                .update(updateObj)
                .match({ moduleid: moduleId });

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Deleting a Module:
        - moduleId: ID of the module to delete.
    ===========================================================================*/
        async deleteModule(moduleId: number) {
            const { data, error } = await this.supabase
                .from('modules')
                .delete()
                .match({ moduleid: moduleId });

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Updating a Lesson:
        - lessonId: ID of the lesson to update.
        - updateObj: Object containing the fields to update.
    ===========================================================================*/
        async updateLesson(lessonId: number, updateObj: Partial<lessonsModel>) {
            const { data, error } = await this.supabase
                .from('lessons')
                .update(updateObj)
                .match({ lessonid: lessonId });

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

    /* Deleting a Lesson:
        - lessonId: ID of the lesson to delete.
    ===========================================================================*/
        async deleteLesson(lessonId: number) {
            const { data, error } = await this.supabase
                .from('lessons')
                .delete()
                .match({ lessonid: lessonId });

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

    /* Updating a Level:
        - levelId: ID of the level to update.
        - updateObj: Object containing the fields to update.
    ===========================================================================*/
        async updateLevel(levelId: number, updateObj: Partial<levelsModel>) {
            const { data, error } = await this.supabase
                .from('levels')
                .update(updateObj)
                .match({ id_level: levelId });

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

    /* Deleting a Level:
        - levelId: ID of the level to delete.
    ===========================================================================*/
        async deleteLevel(levelId: number) {
            const { data, error } = await this.supabase
                .from('levels')
                .delete()
                .match({ id_level: levelId });

            if (error) {
                return { error: error.message };
                
            } else {
                return data;
            }
        }
}