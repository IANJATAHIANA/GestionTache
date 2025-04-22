import express from 'express'
import { UserController } from '../controller/user.controller'

const userRoute = express.Router();
const userController = new UserController();

userRoute.post('/', async (req, res) => await userController.createUser(req, res));
userRoute.put('/:idUser', async (req, res) => await userController.updateUser(req, res));
userRoute.get('/', async (req, res) => await userController.getUser(req, res));
userRoute.delete('/:idUser', async (req, res) => await userController.deleteUser(req, res));

userRoute.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        await userController.login(req, res);  
    } catch (error) {
        res.status(500).json({ error: 'Internal server error of login'});
    }
});

userRoute.post('/auth', async (req: express.Request, res: express.Response) => {
    try {
        await userController.authenticate(req, res);
    } catch (error) {
        res.status(500).json({error: 'Internal server error of token'});
    }
});

export default userRoute;