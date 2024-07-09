// ContactModel.ts
export interface ContactModel {
    nome: string;
    email: string;
    curso: string;
    assunto: string;
    mensagem: string;
}

export function contactHtml(imgPath: string, nome: string, email: string, curso: string, assunto: string, mensagem: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Contact Request</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
    
            body {
                font-family: 'Open Sans', Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .header img {
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #333333;
            }
            .content {
                padding: 20px 0;
                text-align: center;
            }
            .content p {
                font-size: 16px;
                color: #555555;
                line-height: 1.5;
            }
            .message-color {
                color: #223D5D;
            }
            .footer {
                padding: 10px 0;
                text-align: center;
                font-size: 12px;
                color: #aaaaaa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="${imgPath}" alt="Company Logo" width="100"/>
                <h1>Contact Request Received</h1>
            </div>
            <div class="content">
                <p>Olá,</p>
                <p>We have received your contact request with the following details:</p>
                <p><strong>Name:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Course:</strong> ${curso}</p>
                <p><strong>Subject:</strong> ${assunto}</p>
                <p><strong>Message:</strong></p>
                <p class="message-color">${mensagem}</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Company Name.</p>
            </div>
        </div>
    </body>
    </html>
    `
}