import { carrosselModel, meetUsDescriptionModel, meetUsModel, teamModel, termsOfUseModel } from "../models/platformModels";
import { SupabaseService } from "../services/SupabaseService";

export class PlatformController {
    private supabase: any;
    private supabaseService!: SupabaseService;

    constructor() {
        this.supabaseService = SupabaseService.getInstance();
        this.supabase = this.supabaseService.createdClient;
    }

    /* Log in user:
    ===========================================================================*/
        async loginUser(email: string, password: string) {
            const { data, error } = await this.supabase.auth.signInWithPassword(
                { email: email, password: password }
            );

            if (error) {
                return { error: error.message };
            } else {
                return { data };
            }
        }

    /* Log out user:
    ===========================================================================*/
        async logoutUser() {
            const { error } = await this.supabase.auth.signOut();

            if (error) {
                return { error: error.message };
            } else {
                return { message: 'User logged out successfully' };
            }
        }

    /* Carrossel Table Operations
    ===========================================================================*/
        async getAllCarrossel() {
            const { data, error } = await this.supabase
                .from('carrossel')
                .select('*');

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

        async updateCarrossel(carrosselId: number, carrosselObj:carrosselModel) {
            const { data, error } = await this.supabase
                .from('carrossel')
                .update(carrosselObj)
                .match({ id: carrosselId})

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

        async deleteCarrossel(carrosselId: number) {
            const { data, error } = await this.supabase
                .from('carrossel')
                .delete()
                .match({ id: carrosselId });

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

        async createCarrossel(carrosselObj: carrosselModel) {
            const { data, error } = await this.supabase
                .from('carrossel')
                .insert([carrosselObj]);

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Meet Us Table Operations
    ===========================================================================*/
        async getMeetUs() {
            const { data, error } = await this.supabase
                .from('meet_us')
                .select('*')
                .single();

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

        async updateMeetUs(meetUsObj: meetUsModel) {
            const { data, error } = await this.supabase
                .from('meet_us')
                .update(meetUsObj)
                .match({ id: 1 });

            if (error) {
                return { error: error.message };
                
            } else {
                return data;
            }
        }

        async updateMeetUsDescription(meetUsObj: meetUsDescriptionModel) {
            const defineDescription = () => {
                if (meetUsObj.description_num === 1) {
                    return { description_1: meetUsObj.description };
                } else {
                    return { description_2: meetUsObj.description };
                }
            };
        
            const updateObject = defineDescription();
        
            const { data, error } = await this.supabase
                .from('meet_us')
                .update(updateObject)
                .match({ id: 1 });
        
            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

        async deleteMeetUs() {
            const { data, error } = await this.supabase
                .from('meet_us')
                .delete()
                .eq('id', 1);

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

        async createMeetUs(meetUsObj: meetUsModel) {
            const { data, error } = await this.supabase
                .from('meet_us')
                .insert([meetUsObj]);

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Team Table Operations
    ===========================================================================*/
        async getTeam() {
            const { data, error } = await this.supabase
                .from('team')
                .select('*');

            if (error) {
                return { error: error.message };
                
            } else {
                return data;
            }
        }

        async updatePersonTeam(id: number, teamObj: teamModel) {
            const { data, error } = await this.supabase
                .from('team')
                .update(teamObj)
                .match({ id: id })

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

        async deletePersonTeam(id: number) {
            const { data, error } = await this.supabase
                .from('team')
                .delete()
                .match({ id: id })

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

        async createPersonTeam(teamObj: teamModel) {
            const { data, error } = await this.supabase
                .from('team')
                .insert([teamObj]);

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

    /* Terms of Use Table Operations
    ===========================================================================*/
        async getTermsOfUse() {
            const { data, error } = await this.supabase
                .from('terms_of_use')
                .select('*')
                .single();

            if (error) {
                return { error: error.message };

            } else {
                return data;
            }
        }

        async updateTermsOfUse(termsOfUseObj: termsOfUseModel) {
            const { data, error } = await this.supabase
                .from('terms_of_use')
                .update(termsOfUseObj)
                .eq('id', 1);

            if (error) {
                return { error: error.message };
                
            } else {
                return data;
            }
        }

        async deleteTermsOfUse() {
            const { data, error } = await this.supabase
                .from('terms_of_use')
                .delete()
                .eq('id', 1);

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }

        async createTermsOfUse(termsOfUseObj: termsOfUseModel) {
            const { data, error } = await this.supabase
                .from('terms_of_use')
                .insert([termsOfUseObj]);

            if (error) {
                return { error: error.message };
            } else {
                return data;
            }
        }
}