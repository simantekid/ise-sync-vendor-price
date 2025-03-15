import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("kelompokharga")
export class PriceplanEntity {
  @PrimaryGeneratedColumn({name: 'idkelompokharga'})
  id: number;

  @Column()
  nama: string;
}