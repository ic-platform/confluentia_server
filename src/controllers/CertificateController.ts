import { SupabaseService } from "../services/SupabaseService";

export class CertificateController {
    private supabase: any;

    constructor(private Supabase: SupabaseService) {
        this.supabase = Supabase.createdClient();
    }

    /* Creating a unique Certificate Code:
        - platform: 'confluentia'
        - university: 'fumec'
        - date: current date in YYYYMMDD format
        - courseId: Id of the course to which the certificate is associated
        - studentId: Id of the student to whom the certificate belongs
    ===========================================================================*/
    generateCertificateCode(platform: string, university: string, date: string, courseId: number, studentId: number): string {
        return `${platform}_${university}_${date}_${courseId}_${studentId}`;
    }

    /* Creating a Certificate:
        - studentId: Id of the student to whom the certificate belongs
        - courseId: Id of the course to which the certificate is associated
    ===========================================================================*/
    async createCertificate(studentId: number, courseId: number) {
        const platform = 'confluentia';
        const university = 'fumec';
        const date = new Date().toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD format

        const certificateCode = this.generateCertificateCode(platform, university, date, courseId, studentId);

        const { data, error } = await this.supabase
            .from('certificates')
            .insert([{ studentId, courseId, certificateCode }])
            .single();

        if (error) {
            return { error: error.message };
        } else {
            return data;
        }
    }

    /* Fetching Certificates by Student ID:
        - studentId: Id of the student whose certificates are to be fetched
        - Returns a list of certificates associated with the student
    ===========================================================================*/
    async getCertificatesByStudentId(studentId: number) {
        const { data, error } = await this.supabase
            .from('certificates')
            .select('*')
            .eq('studentId', studentId);

        if (error) {
            return { error: error.message };
        } else {
            return data;
        }
    }

    /* Fetching Certificates by Course ID:
        - courseId: Id of the course whose certificates are to be fetched
        - Returns a list of certificates associated with the course
    ===========================================================================*/
    async getCertificatesByCourseId(courseId: number) {
        const { data, error } = await this.supabase
            .from('certificates')
            .select('*')
            .eq('courseId', courseId);

        if (error) {
            return { error: error.message };
        } else {
            return data;
        }
    }
}
