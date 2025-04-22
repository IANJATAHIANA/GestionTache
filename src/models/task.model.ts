import { EPriorite } from "./enum.model";

export interface ITask {
    idTask?: number,
    title: string,
    description: string,
    priorite: EPriorite,
    date_echeance: Date,
}