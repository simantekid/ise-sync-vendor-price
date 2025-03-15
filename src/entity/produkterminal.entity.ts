import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdukEntity } from "./produk.entity";
import { TerminalEntity } from "./terminal.entity";

@Entity("produkterminal")
export class ProdukTerminalEntity {
    @PrimaryGeneratedColumn({ name: 'idprodukterminal' })
    id: number;
    @ManyToOne(() => TerminalEntity, (terminal) => terminal.id, { nullable: false })
    @JoinColumn({ name: 'idterminal' })
    terminal: TerminalEntity;
    @ManyToOne(() => ProdukEntity, (produk) => produk.id, { nullable: false })
    @JoinColumn({ name: 'idproduk' })
    produk: ProdukEntity;
    @Column()
    hargabeli: Number;
    @Column({ name: 'formatkeluar' })
    kodesuplier: string;
    @Column()
    aktif: Number;
}