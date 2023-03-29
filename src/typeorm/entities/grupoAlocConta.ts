import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'GRUPO_ALOC_CONTA', synchronize: false })
export class GRUPO_ALOC_CONTA {
    @Column()
      GACO_IND_BASE: string

    @PrimaryColumn()
      GACO_COD: string

    @Column()
      GACO_NOME: string

    @Column()
      GACO_APCO_COD: string
}
