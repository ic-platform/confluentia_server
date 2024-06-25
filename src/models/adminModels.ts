export function createAdminPasswordEmail(password:string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Senha Inicial de Administrador</title>
        <style>
            body {
                font-family: Arial, sans-serif;
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
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                border-radius: 5px;
                text-decoration: none;
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
                <h1>Senha de Administrador Confluentia</h1>
            </div>
            <div class="content">
                <p>Olá,</p>
                <p>Você foi adicionado como administrador na plataforma Confluentia da FUMEC.</p>
                <p>Segue abaixo sua senha inicial de acesso a plataforma 👇</p>
                <p><strong>${password}</strong></p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Confluentia.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}
