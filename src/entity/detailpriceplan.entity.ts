import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProdukEntity } from "./produk.entity";
import { PriceplanEntity } from "./priceplan.entity";

@Entity("detailkelompokharga")
export class DetailPricePlanEntity {
    @PrimaryGeneratedColumn({ name: 'iddetailkelompok' })
    id: number;
    @ManyToOne(() => PriceplanEntity, (produk) => produk.id, { nullable: false })
    @JoinColumn({ name: 'idkelompokharga' })
    priceplan: PriceplanEntity;
    @ManyToOne(() => ProdukEntity, (produk) => produk.id, { nullable: false })
    @JoinColumn({ name: 'idproduk' })
    produk: ProdukEntity;
    @Column()
    hargajual: Number;
    @Column()
    aktif: Number;
}