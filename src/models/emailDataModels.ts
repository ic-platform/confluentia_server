export interface emailDataModel {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html: string;
}

export interface oAuthDataModel {
    type: string;
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}