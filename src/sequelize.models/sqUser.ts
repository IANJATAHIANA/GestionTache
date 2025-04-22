    import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique  } from "sequelize-typescript";
import { IUser } from "../models/user.model";

@Table({
    tableName: 'User',
    timestamps: true,
})

export class sqUser extends Model<IUser> implements IUser{
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    idUser?: number;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    profil!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName!: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    createdAt!: number;

}
