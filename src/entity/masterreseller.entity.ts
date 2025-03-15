import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { PriceplanEntity } from "./priceplan.entity";

@Entity("masterreseller")
export class MasterresellerEntity {
    @PrimaryGeneratedColumn({ name: 'idreseller' })
    id: string;
    @Column({name: 'namareseller'})
    nama: string;
    @Column()
    patokanhargajual: number;
}