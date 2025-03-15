import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("produk")
export class ProdukEntity {
  @PrimaryGeneratedColumn({name: 'idproduk'})
  id: number;
  @Column()
  namaproduk: string;
  @Column()
  kodeproduk: string;
}