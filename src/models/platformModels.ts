/* Carrossel Model:
===========================================================================*/
    export interface carrosselModel {
        title: string;
        caption: string;
        description: string;
        imageUrl: string;
    }

/* Meet Us Model:
===========================================================================*/
    export interface meetUsModel {
        description_1: string;
        description_2: string;
    }

/* Meet Us Description Model:
===========================================================================*/
    export interface meetUsDescriptionModel {
        description: string;
        description_num: number;
    }

/* Team Model:
===========================================================================*/
    export interface teamModel {
        type: string;
        name: string;
        lattes_link: string;
        imageUrl: string;
    }

/* Terms of Use Model:
===========================================================================*/
    export interface termsOfUseModel {
        terms: string;
    }