import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sqUser } from "../sequelize.models/sqUser"; 
import { IUser } from "../models/user.model";

export class UserService {

    public async createUser (userData: IUser): Promise<IUser>{
        try {
            const hash = bcrypt.genSaltSync(10);
            const cryptPassword = bcrypt.hashSync(userData.password, hash);
            userData.password = cryptPassword;
            console.log("Mot de passe haché:", cryptPassword);

            const temp: IUser = {
                profil: userData.profil,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                createdAt: Date.now() / 1000
            }
            return await sqUser.create(temp);
            
        } catch (error) {
            throw new Error("Erreur lors de l'ajout de nouveau membre");
            
        }
    }

    public async getAllUser(): Promise<IUser[]>{
        try {
            const users = await sqUser.findAll();
            console.log("Affichage réussi");
            return users.map((user) => user.get({ plain: true }) as IUser);
            
        } catch (error) {
            throw new Error("Erreur lors de l'affichage de l'user");
            
        }
    }

    public async updateUser(idUser: number, userData: Partial<IUser>): Promise<void>{
        try {
            const user = await sqUser.findByPk(idUser);
            if (!user) {
                console.error("Erreur lors de mis à jours");
                return;
                
            }

            if(userData.password){
                const hash = bcrypt.genSaltSync(10);
                const cryptPassword = bcrypt.hashSync(userData.password, hash);
                userData.password = cryptPassword;
            }
            await user.update(userData)
            console.log("Mis à jour faite avec succès");
                
        } catch (error) {
            throw new Error("Erreur lors de mis à jour de membre");
            
        }
    }

    public async deleteUser(idUser: number): Promise<void>{
        try {
            
            const user = await sqUser.findByPk(idUser);
            if (!user) {
                console.error("Erreur de suppression");     
            }else{
                await user.destroy();
                console.log("Suppression faite avec succès");     
            }
        } catch (error) {
            throw new Error("Erreur lors de la suppression");           
        }
    }

    public async login(userData: {email: string, password: string}): Promise<{idUser: number | undefined, token: string}>{
        try {
            const user = await sqUser.findOne({
                where: {
                    email: userData.email
                }
            });

            if (!user) {
                throw new Error("erreur lors de la connexion");              
            }

            const passwordValid = await bcrypt.compare(userData.password, user.password);
            if (!passwordValid) {
                throw new Error("Mot de passe incorrect!");
                
            }else{
                const secret = process.env.JWT_SECRET || "default_secret"
                const response = {
                    idUser: user.idUser,
                    token: Jwt.sign({ id: user.idUser }, secret, { expiresIn: '3h' }),
                    user: user
                }
                return response;
            }

        } catch (error) {
            throw new Error("Erreur lors de la connexion");

        }
    } 

    public async authenticate(token: string){
        try {
            const secret = process.env.JWT_SECRET || "default_secret";
            const result = Jwt.verify(token, secret);

            if(!result){
                throw 'fake token'
            }
            return result;
        } catch (error) {
            throw error         

        }
    }
}

