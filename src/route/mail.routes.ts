import express from "express";
import { EnvoyerEmail } from "../controller/mail.controller";

const emailRouter = express.Router();

emailRouter.post('/send', EnvoyerEmail);

export default emailRouter;  