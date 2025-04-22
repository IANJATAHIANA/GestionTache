import { Response, Request } from "express";
import { UserService } from "../service/user.service";
import { IUser } from "../models/user.model";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(req: Request, res: Response): Promise<void>{
        let success = false;
        let status: number

        try {
            const userData = req.body as IUser;
            const newUser = await this.userService.createUser(userData);
            success = true;
            status = 200;
            res.status(status).json(newUser);
            
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'ajout"});
            
        }
    }

    public async getUser(req: Request, res: Response): Promise<void>{
        let success = false;
        let status: number;

        try {
            const users = await this.userService.getAllUser();
            success = true;
            status = 200;
            res.status(status).json(users);

        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'affichage"});
            
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void>{
        let success = false;
        let status: number;

        try {
            const {idUser} = req.params;
            const userData = req.body as Partial<IUser>
            const users = await this.userService.updateUser(Number(idUser), userData);
            success = true;
            status = 200;
            res.status(status).json(users);

        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mis à jours"});
            
        }
    }

    public async deleteUser(req:Request, res: Response){
        let success = false;
        let status: number;

        try {
            const {idUser} = req.params;
            const users = await this.userService.deleteUser(Number(idUser));
            success = true;
            status = 200;
            res.status(status).json(users);

        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression"});
            
        }
    }

    public async login(req: Request, res: Response): Promise<void>{
        let success =  false;
        let status: number;
        let {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Erreur de l\'email'
            });
            return;
        }

        try {
            const result = await this.userService.login({email: email, password: password});
            console.log(result);

            success = true;
            status = 200;
            res.status(status).json(result);
            
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la connexion"});         
            
        }
    }

    public async authenticate(req: Request, res: Response){
        let success = false;
        let status: number;

        const {token} = req.body;

        if(!token){
            res.status(400).json({
                success: false,
                message: " fake token "
            });
            return; 
        }

        try {
            const result = await this.userService.authenticate(token);
            success = true;
            status = 200;
            res.status(status).json(result);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'authentification"});          
            
        }
    }
}
