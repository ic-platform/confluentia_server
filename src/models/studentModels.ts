/* Complete Object to Create Student User Interface:
===========================================================================*/
    export interface createStudentModel {
        name: string;
        email: string;
        phone: string;
        password: string;
        role?: string;
    }

/* Object to Edit Student User Interface:
===========================================================================*/
    export interface editStudentModel {
        name: string;
        email: string;
        phone: string;
        role?: string;
    }