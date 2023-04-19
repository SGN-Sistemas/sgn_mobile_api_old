import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'PLANILHA_COMPRA', synchronize: false })
export class PlanilhaCompra {
  @PrimaryColumn()
    PLAC_COD: number

   @Column()
     PLAC_SECO_COD: number

   @Column()
     PLAC_STATUS: string

  @Column()
    PLAC_PESS_COD: number

  @Column()
    PLAC_USUA_COD_ASS_1: number

  @Column()
    PLAC_USUA_COD_ASS_2: number

  @Column()
    PLAC_ASSINATURA_1: string

  @Column()
    PLAC_ASSINATURA_2: string

  @Column()
    PLAC_DATA_APROVACAO1: Date

  @Column()
    PLAC_DATA_APROVACAO2: Date
}
