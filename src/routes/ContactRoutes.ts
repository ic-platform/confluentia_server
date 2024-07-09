import express from "express";
import { SendEmailService } from './../services/SendEmailService';
import { ContactModel, contactHtml } from "../models/contactModels";
import { emailDataModel } from "../models/emailDataModels";

const contactRoutes = express.Router();
const sendEmailService = new SendEmailService();

contactRoutes.post("/contact", async (req, res) => {
  const contactData: ContactModel = req.body;

  try {

    const emailData: Partial<emailDataModel> = {
        to: process.env.EMAIL_USER || '',
        subject: 'Nova Mensagem Recebida da Plataforma',
        html: contactHtml(
            "https://example.com/logo.png",
            contactData.nome,
            contactData.email,
            contactData.curso,
            contactData.assunto,
            contactData.mensagem
        )
    };
    
    let result = await sendEmailService.sendEmail(emailData);

    res.status(200).json({ message: "Email enviado com sucesso." });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

export default contactRoutes;
