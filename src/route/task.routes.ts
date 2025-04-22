import express from "express"
import { TaskController } from "../controller/task.controller"

const taskRoute = express.Router();
const taskController = new TaskController();

taskRoute.post('/', async  (req, res) => await taskController.createTask(req, res));
taskRoute.get('/', async (req, res) => await taskController.getTask(req, res)),
taskRoute.put('/:idTask', async (req, res) => await taskController.updateTask(req, res));
taskRoute.delete('/:idTask', async (req, res) => await taskController.deleteTask(req, res));

export default taskRoute;   