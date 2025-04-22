import { sqTask } from "../sequelize.models/sqTask";
import { ITask } from "../models/task.model";
import { EPriorite } from "../models/enum.model";

export class TaskService {
    
    public async createTask(taskData: ITask): Promise<ITask>{
        try {

            if (!Object.values(EPriorite).includes(taskData.priorite)) {
                throw new Error("Priorité invalide");
            }          

            const temp: ITask = {
                title: taskData.title,
                description: taskData.description,
                priorite: taskData.priorite,
                date_echeance: taskData.date_echeance
            } 
            return await sqTask.create(temp);

        } catch (error) {
            throw new Error("Erreur lors de l'ajout de tache");
            
        }
    }

    public async getTask(): Promise<ITask[]>{
        try {
            const tasks = await sqTask.findAll();
            console.log("Tache ajouter avec succes");
            return tasks.map((task) => task.get({ plain: true}) as ITask);

        } catch (error) {
            throw new Error("Erreur lors de la l'Affichage de tache");
            
        }
    }

    public async updateTask(idTask: number, taskData: ITask): Promise<void>{
        try {
            const task = await sqTask.findByPk(idTask);
            if(!task){
                console.error("Identifiant de tache non trouver pour la is à jours");
                
            }else{
                await task.update(taskData);
                console.log("Mis à jour faite avec succes");
                
            }
        } catch (error) {
            throw new Error("Erreur lors de la mis à jours de tache");
            
        }
    }

    public async deleteTask(idTask: number): Promise<void>{
        try {
            const task = await sqTask.findByPk(idTask);

            if(!task){
                console.error('Identifiant de tache non trouver pour la suppression');
                
            }else{
                await task.destroy();
                console.log("Suppression de Task faite avec succès");
                
            }
        } catch (error) {
            throw new Error("Erreur lors de la suppression de Tache");
            
        }
    }
}
