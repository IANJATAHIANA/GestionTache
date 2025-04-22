import { Response, Request } from "express";
import { ITask } from "../models/task.model";
import { TaskService } from "../service/task.service";
import { EPriorite } from "../models/enum.model";

export class TaskController {
    private taskService: TaskService;

    constructor(){
        this.taskService = new TaskService;
    }

    public async createTask(req: Request, res: Response): Promise<void> {
        let success = false;
        let status: number;
        
        try {
            const taskData = req.body as ITask;
            console.log("Données reçues pour la tâche:", taskData);

            if (!['Haut', 'Moyenne', 'Bas'].includes(req.body.priorite)) {
                throw new Error('Priorité invalide')
            }
              
            

            if (taskData.date_echeance) {
                const parsedDate = new Date(taskData.date_echeance);
                if (isNaN(parsedDate.getTime())) {
                  res.status(400).json({ error: "Format de date invalide" });
                  return;
                }
                taskData.date_echeance = parsedDate;
            }

            const newTask = await this.taskService.createTask(taskData);
            success = true;
            status = 200;
            res.status(status).json(newTask);

        } catch (error) {
            console.error("Erreur dans le controller:", error);
            res.status(500).json({ error: "Erreur lors de l'ajout de task dans le controller" });
            
        }
    }

    public async getTask(req: Request, res:Response): Promise<void> {
        let success = false;
        let status: number;

        try {
            const gettask = await this.taskService.getTask();
            success = true;
            status = 200;
            res.status(status).json(gettask);

        } catch (error) {
            res.status(500).json({ error: "Erreur lors de l'affichage de task dans le controller" });
            
        }
    }

    public async updateTask(req: Request, res: Response): Promise<void> {
        let success = false;
        let status: number;

        try {
            const {idTask} = req.params;
            const taskData = req.body as ITask;
            const updateTask = await this.taskService.updateTask(Number(idTask), taskData);
            success = true;
            status = 200;
            res.status(status).json(updateTask);  

        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la mis à jours de task dans le controller" });
            
        }
    }

    public async deleteTask(req: Request, res: Response): Promise<void> {
        let success = false;
        let status: number;

        try {
            const {idTask} = req.params;
            const deleteTask = await this.taskService.deleteTask(Number(idTask));
            success = true;
            status = 200;
            res.status(status).json(deleteTask);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression de task dans le controller" });
            
        }
    }
}