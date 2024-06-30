import { partialCertificateModel, createCertificateModel, completeCertificateModel } from '../models/certificateModels';
import { SupabaseService } from '../services/SupabaseService';

export class CertificateController {
    private supabase: any;
    private supabaseService!: SupabaseService;

    constructor() {
        this.supabaseService = SupabaseService.getInstance();
        this.supabase = this.supabaseService.createdClient;
    }

    /* Defining the default certificate model:
    ===========================================================================*/
        private defaultElements: Partial<partialCertificateModel> = {
            platform: 'confluentia',
            university: 'fumec'
        }

    /* Creating a unique Certificate Code:
        - platform: 'confluentia'
        - university: 'fumec'
        - date: current date in YYYYMMDD format
        - courseId: Id of the course to which the certificate is associated
        - studentId: Id of the student to whom the certificate belongs
    ===========================================================================*/
        private generateCertificateCode(certificateElements: partialCertificateModel): string {
            return `${certificateElements.platform}_${certificateElements.university}_${certificateElements.date}_${certificateElements.courseId}_${certificateElements.studentId}`;
        }

    /* Creating a Certificate:
        - studentId: Id of the student to whom the certificate belongs
        - courseId: Id of the course to which the certificate is associated
    ===========================================================================*/
        async createCertificate(createCertificateModel: createCertificateModel) {
            const date = new Date().toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD format

            const certificateElements: partialCertificateModel = {
                ...this.defaultElements,
                date: date,
                ...createCertificateModel
            }

            const completeCertificate: completeCertificateModel = {
                ...certificateElements,
                certificateCode: this.generateCertificateCode(certificateElements)
            };

            const { data, error } = await this.supabase
                .from('certificates')
                .insert([{ studentId: completeCertificate.studentId, courseId: completeCertificate.courseId, certificateCode: completeCertificate.certificateCode }])
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

    /* Fetching Certificate by Certificate Code:
        - certificateCode: Code of the certificate to be fetched
        - Returns a single certificate associated with the code
    ===========================================================================*/
        async getCertificateByCode(certificateCode: string) {
            const { data, error } = await this.supabase
                .from('certificates')
                .select('*')
                .eq('certificateCode', certificateCode)
                .single();

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }
}
