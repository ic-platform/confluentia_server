/* Create Course Model:
=======================================================================*/
    export interface courseModel {
        courseName: string;
        duration: number;
        levelId: number;
        description: string;
        tags: string[];
    }

/* Levels Model:
=======================================================================*/
    export interface levelsModel {
        id_level: number;
        type: string;
    }

/* Create Module:
=======================================================================*/
    export interface moduleModel {
        moduleName: string;
        courseId: number;
        totalLessons: number;
    }

/* Create Lessons Model:
=======================================================================*/
    export interface lessonsModel {
        lessonName: string;
        description: string;
        resourcesUrl: string[];
        moduleId: number;
        lessonUrl: string;
    }