import { Sequelize } from "sequelize-typescript";
import { sqUser } from "../sequelize.models/sqUser";
import { sqTask } from "../sequelize.models/sqTask";

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'gestionTache',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    port: Number(process.env.DB_PORT) || 8889,
    models:[sqUser, sqTask]
})

const connectDatabase = async() => {
    try{
        await sequelize.authenticate();
        console.log("Connexion à la base de donnée réussi!");
        await sequelize.sync({force: false});
        
    }catch{
        console.error("Erreur lors de la connexion à la base de donnée!");
        
    }
}

export {
    connectDatabase,
    sequelize
}