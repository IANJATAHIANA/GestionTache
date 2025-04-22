import express, {Response, Request} from "express";
import { connectDatabase } from "./config/database";
import { sqUser } from "./sequelize.models/sqUser";
import cors from "cors";
import userRoute from "./route/user.routes";
import { sqTask } from "./sequelize.models/sqTask";
import taskRoute from "./route/task.routes";
import dotenv from 'dotenv';
import emailRouter from "./route/mail.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import https from "https";
import fs from "fs";
import http from "http"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

// limiter les requetes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // max 100 requêtes par IP
  });
app.use(limiter);

app.use(express.json());

// securite des headers avec Hemlet
app.use(helmet());

// middleWare pour gérer le cors(partage securise entre backend et frontend)
app.use(cors({
    origin: '*',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));


//   route pour user
app.use('/api/user/', userRoute);

// route pour task
app.use('/api/task/', taskRoute)

// route pour l'email
app.use('/api/mail', emailRouter);

//   gestion de route non trouvé
app.use((req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: 'Route not found'
    });
});

const start = async() => {
    await connectDatabase();
    await sqUser.sync({ force: false});
    await sqTask.sync({ force: false});
    console.log("database synchronized!");

   // Chargement des certificats
   const httpsOptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

// Serveur HTTPS
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`🔒 HTTPS Server running at https://localhost:${PORT}`);
});

// Serveur HTTP pour rediriger vers HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80, () => {
    console.log("HTTP server running at http://localhost:80 (redirecting to HTTPS)");
});
};

start().catch(err => {
    console.error('Error starting the application:', err);
});
