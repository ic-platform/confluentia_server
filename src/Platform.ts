import { Supabase } from "./supabase";

export class Platform {
    private supabase: any;

    constructor(private Supabase: Supabase) {
        this.supabase = Supabase.createdClient();
    }

    /* Carrossel Table Operations
    ===========================================================================*/
        /* Select all carrossel entries
        =======================================================================*/
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

        /* Update a carrossel entry by id
        =======================================================================*/
            async updateCarrossel(id: number, updates: any) {
                const { data, error } = await this.supabase
                    .from('carrossel')
                    .update(updates)
                    .eq('id', id)
                    .single();

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

        /* Delete a carrossel entry by id
        =======================================================================*/
            async deleteCarrossel(id: number) {
                const { data, error } = await this.supabase
                    .from('carrossel')
                    .delete()
                    .eq('id', id);

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

    /* Meet Us Table Operations
    ===========================================================================*/
        /* Select the meet us entry
        =======================================================================*/
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

        /* Update the meet us entry
        =======================================================================*/
            async updateMeetUs(updates: any) {
                const { data, error } = await this.supabase
                    .from('meet_us')
                    .update(updates)
                    .eq('id', 1)
                    .single();  // Assuming there's only one meet_us entry

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

        /* Delete the meet us entry
        =======================================================================*/
            async deleteMeetUs() {
                const { data, error } = await this.supabase
                    .from('meet_us')
                    .delete()
                    .eq('id', 1);  // Assuming there's only one meet_us entry

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

    /* Team Table Operations
    ===========================================================================*/

        /* Select all people entries
        =======================================================================*/
            async getAllPeople() {
                const { data, error } = await this.supabase
                    .from('people')
                    .select('*');

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

        /* Update a person entry by id
        =======================================================================*/
            async updatePerson(id: number, updates: any) {
                const { data, error } = await this.supabase
                    .from('people')
                    .update(updates)
                    .eq('id', id)
                    .single();

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

        /* Delete a person entry by id
        =======================================================================*/
            async deletePerson(id: number) {
                const { data, error } = await this.supabase
                    .from('people')
                    .delete()
                    .eq('id', id);

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

    /* Terms of Use Table Operations
    ===========================================================================*/

        /* Select the terms of use entry
        =======================================================================*/
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

        /* Update the terms of use entry
        =======================================================================*/
            async updateTermsOfUse(updates: any) {
                const { data, error } = await this.supabase
                    .from('terms_of_use')
                    .update(updates)
                    .eq('id', 1)
                    .single();  // Assuming there's only one terms_of_use entry

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }

        /* Delete the terms of use entry
        =======================================================================*/
            async deleteTermsOfUse() {
                const { data, error } = await this.supabase
                    .from('terms_of_use')
                    .delete()
                    .eq('id', 1);  // Assuming there's only one terms_of_use entry

                if (error) {
                    return { error: error.message };
                } else {
                    return data;
                }
            }
}
