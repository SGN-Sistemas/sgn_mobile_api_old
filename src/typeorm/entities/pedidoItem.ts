import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'PEDIDO_ITEM', synchronize: false })
export class PEDIDO_ITEM {
    @PrimaryColumn()
      PEIT_COD: number

    @Column()
      PEIT_UNMA_COD: number

    @Column()
      PEIT_ALMO_COD: number

    @Column()
      PEIT_SOCO_COD: number

    @Column()
      PEIT_VALORUNI: number

    @Column()
      PEIT_DESCONTO: number

    @Column()
      PEvIT_QTD: number

    @Column()
      PEIT_PEDI_COD: number

    @Column()
      PEIT_MATE_COD: number

    @Column()
      PEIT_QTD_RECEB: number

    @Column()
      PEIT_VALOR_IPI: number

    @Column()
      PEIT_OBS: string

    @Column()
      PEIT_PRFA_COD: number

    @Column()
      PEIT_COMPLEMENTO: string

    @Column()
      PEIT_EMBALAGEM: number

    @Column()
      PEIT_QUANTIDADE_RESERVADA: number

    @Column()
      PEIT_BASE_ICMS: number

    @Column()
      PEIT_VALOR_ICMS: number

    @Column()
      PEIT_BASE_IPI: number

    @Column()
      PEIT_BASE_ICMS_SUBST: number

    @Column()
      PEIT_ICMS_SUBST: number

    @Column()
      PEIT_REDUCAO_ICMS: number

    @Column()
      PEIT_REDUCAO_ICMS_SUB: number

    @Column()
      peit_aliq_ims_sub: number

    @Column()
      PEIT_BASE_ICMS_SUB: number

    @Column()
      PEIT_ICMS_SUB: number

    @Column()
      PEIT_TAPR_COD: number

    @Column()
      PEIT_IPI: number

    @Column()
      PEIT_VLR_MVA: number

    @Column()
      peit_aliq_icms: number

    @Column()
      PEIT_ORIGEM_MERCADORIA: number

    @Column()
      PEIT_SITUACAO_TRIBUTARIA: number

    @Column()

      PEIT_COD_PRODUTO_CLIENTE: string

    @Column()
      PEIT_ST_DESCRICAO_NF: string

    @Column()
      PEIT_ALIQ_SIMBAHIA: number

    @Column()
      PEIT_VALOR_SIMBAHIA: number

    @Column()
      PEIT_ITPC_COD: number

    @Column()
      PEIT_CERE_COD: number

    @Column()
      PEIT_COMISSAO_AGENCIA: number

    @Column()
      PEIT_VALOR_REDUCAO_ICMS: number

    @Column()
      PEIT_VALOR_ISENTAS: number

    @Column()
      PEIT_VALOR_OUTRAS: number

    @Column()
      PEIT_ORDEM_IMPRESSAO: number

    @Column()
      PEIT_REDUCAO_PRECO: number

    @Column()
      PEIT_DTENTREGA: Date

    @Column()
      PEIT_CONCLUIDO: string

    @Column()
      PEIT_FATURAR: string

    @Column()
      PEIT_QTD_IMPRIME: number

    @Column()
      PEIT_PROJ_COD: number

    @Column()
      PEIT_ETPR_COD: number
}
