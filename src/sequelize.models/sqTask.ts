import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique  } from "sequelize-typescript";
import { ITask } from "../models/task.model";
import { EPriorite } from "../models/enum.model";

@Table({
    tableName: "Task",
    timestamps: true,
})

export class sqTask extends Model<ITask> implements ITask{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    idTask?: number | undefined;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.ENUM(...Object.values(EPriorite)),
        allowNull: false
    })
    priorite!: EPriorite;

    @Column({
        type: DataType.DATE
    })
    date_echeance!: Date

}