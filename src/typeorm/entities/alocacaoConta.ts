import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'ALOCACAO_CONTA', synchronize: false })
export class ALOCACAO_CONTA {
    @Column()
      ALCO_SUCC_COD: number

    @PrimaryColumn()
      ALCO_COD: number

    @Column()
      ALCO_GACO_COD: string

    @Column()
      ALCO_APCO_COD: string
}
