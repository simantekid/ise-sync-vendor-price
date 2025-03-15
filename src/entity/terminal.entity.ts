import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("terminal")
export class TerminalEntity {
    @PrimaryGeneratedColumn({ name: 'idterminal' })
    id: number;
    @Column()
    namaterminal: string;
    @Column()
    jenisterminal: number;
    @Column({name: 'defaultcom'})
    idrs: string;
    @Column({name: 'notujuan'})
    url: string;
}