import { Request, Response } from "express";
import { sendEmail } from "../service/mail.service";

export const EnvoyerEmail = async (req: Request, res: Response) => {
    const { to, subject, text, html } = req.body;
  
    try {
      const result = await sendEmail({ to, subject, text, html });
      res.status(200).json({ message: 'Email envoyé avec succès', result });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l’envoi du mail', error });
    }
  };