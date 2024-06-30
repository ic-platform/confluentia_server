/* Complete certificate model:
===========================================================================*/
    export interface completeCertificateModel {
        platform?: string;
        university?: string;
        date: string;
        courseId: number;
        studentId: number;
        certificateCode: string;
    }

/* Break Certificate Model:
===========================================================================*/
    export interface partialCertificateModel {
        platform?: string;
        university?: string;
        date: string;
        courseId: number;
        studentId: number;
    }

/* Create Certificate Model:
===========================================================================*/
    export interface createCertificateModel {
        courseId: number;
        studentId: number;
    }