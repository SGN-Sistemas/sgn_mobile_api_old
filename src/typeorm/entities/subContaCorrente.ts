import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm'

@Entity({ name: 'SUB_CONTA_CORRENTE', synchronize: false })
export class SUB_CONTA_CORRENTE {
    @PrimaryColumn()
      SUCC_COCO_COD: number

    @PrimaryColumn()
      SUCC_COD: number

    @Column()
      SUCC_SALDO: number

    @Column()
      SUCC_LIM_CRED: number

    @Column()
      SUCC_STCC_COD: string

    @Column()
      SUCC_TISC_COD: number

    @Column()
      SUCC_DESC: string

    @Column()
      SUCC_CONTA_REDUZ: number

    @Column()
      SUCP_FILIAL: number

    @Column()
      SUCC_IND_NAO_EXPORTA: string

    @Column()
      SUCC_NAO_INCLUI_FLUXO: string

    @Column()
      SUCC_NUMCHEQUE_FIXO: string

    @Column()
      SUCC_NUMCHEQUE_VARIAVEL: number

    @Column()
      SUCC_BLOQUEAR_NEGATIVO: string

    @Column()
      SUCC_COMPLEMENTO_REDUZ: string

    @Column()
      SUCC_EMPREST_REDUZIDO: number

    @Column()
      SUCC_CERE_COD: number
}
