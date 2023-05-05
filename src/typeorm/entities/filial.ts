import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'EMPRESA', synchronize: false })
export class FILIAL {
    @PrimaryColumn()
      FILI_COD: number

    @Column()
      FILI_UNFE_SIGLA: string

    @Column()
      FILI_EMPR_COD: number

    @Column()
      FILI_NOME_FANTASIA: string

    @Column()
      FILI_CGC: string

    @Column()
      FILI_INSC_EST: string

    @Column()
      FILI_ENDERECO: string

    @Column()
      FILI_TELEFONE: string

    @Column()
      FILI_CIDADE: string

    @Column()
      FILI_INSC_MUNIC: string

    @Column()
      FILI_CEP: string

    @Column()
      FILI_CONTATO: string

    @Column()
      FILI_BAIRRO: string

    @Column()
      FILI_FAX: string

    @Column()
      FILI_NOTA_FISCAL_QRP: string

    @Column()
      FILI_NUM_PROX_NOTA_FISCAL: number

    @Column()
      FILI_NOTA_FISCAL_QRP_SERV: string

    @Column()
      FILI_NUM_PROX_NOTA_FISCAL_SERV: number

    @Column()
      FILI_NOTA_VENDA_E_SERVICO: string

    @Column()
      FILI_NOTA_VENDA_ITENS: number

    @Column()
      FILI_NOTA_SERVICO_ITENS: number

    @Column()
      FILI_ALMO_COD_PADRAO: number

    @Column()
      FILI_CONTRIBUINTE_IPI: string

    @Column()
      FILI_DUPLICATA_QRP: string

    @Column()
      FILI_LOGOTIPO: string

    @Column()
      FILI_NOTA_VENDA_COL: number

    @Column()
      FILI_NOTA_SERVICO_COL: number

    @Column()
      FILI_PEDIDO_QRP: string

    @Column()
      FILI_ORCAMENTO_QRP: string

    @Column()
      FILI_CIDA_COD: number

    @Column()
      FILI_BAIR_COD: number

    @Column()
      FILI_FATURA_QRP: string

    @Column()
      FILI_ALIQ_ISS: number

    @Column()
      FILI_QTDE_LINHAS_OBS_NF: number

    @Column()
      FILI_NUM_PROX_D1: number

    @Column()
      FILI_NUM_PROX_NOTA_FISCAL_FAT: number

    @Column()
      FILI_EMAIL: string

    @Column()
      FILI_SERIE_NF_PRODUTO: string

    @Column()
      FILI_SERIE_NF_SERVICO: string

    @Column()
      FILI_REGIME_PAGAMENTO_ICMS: string

    @Column()
      FILI_TIDS_COD: number

    @Column()
      FILI_SITUACAO_NOTA: string

    @Column()
      FILI_SERIE_D1: string

    @Column()
      FILI_TRANSF_ALMOX_QRP: string

    @Column()
      FILI_NOTA_FISCAL_QRP_LOCA: string

    @Column()
      FILI_NUM_PROX_NOTA_FISCAL_LOCA: number

    @Column()
      FILI_NOTA_LOCACAO: number

    @Column()
      FILI_NOTA_LOCA_COL: number

    @Column()
      FILI_SERIE_NF_LOCACAO: string

    @Column()
      FILI_NOTA_VENDA_E_LOCACAO: string

    @Column()
      FILI_COTACAO_LOCACAO_QRP: string

    @Column()
      FILI_REPARO_LOCACAO_QRP: string

    @Column()
      FILI_NFE_IDLOTE: number

    @Column()
      FILI_NFE_PROD: string

    @Column()
      FILI_CGA: string

    @Column()
      FILI_NUM_PROX_RPS: number

    @Column()
      FILI_NFE_SERV: string

    @Column()
      FILI_TRANSF_FILIAL_QRP: string

    @Column()
      FILI_CONTROLA_CM: string

    @Column()
      FILI_PERCENT_CM: number

    @Column()
      FILI_INCENTIVADOR_CULTURAL: string

    @Column()
      FILI_PERFIL_SPED: string

    @Column()
      FILI_GERA_SPED_ICMS: string

    @Column()
      FILI_GERA_SPED_PIS: string

    @Column()
      FILI_TRANF_ALMOX_QRP_SAIDA: string

    @Column()
      FILI_CODIGO_EXTRA: string

    @Column()
      FILI_CPF_CONTATO: string

    @Column()
      FILI_NUMERO_END: string

    @Column()
      FILI_NAO_ICMS_ST_RETENC: string

    @Column()
      FILI_IND_BLOQ: string

    @Column()
      FILI_NOME_CONTADOR: string

    @Column()
      FILI_CPF_CONTADOR: string

    @Column()
      FILI_CRC_CONTADOR: string

    @Column()
      FILI_UNFE_SIGLA_CONTADOR: string

    @Column()
      FILI_FONE_CONTADOR: string

    @Column()
      FILI_LOGRADOURO_CONTADOR: string

    @Column()
      FILI_NUMERO_CONTADOR: string

    @Column()
      FILI_BAIRRO_CONTADOR: string

    @Column()
      FILI_CEP_CONTADOR: string

    @Column()
      FILI_UNFE_SIGLA_DESC_CONTADOR: string

    @Column()
      FILI_MUNICIPIO_CONTADOR: string

    @Column()
      FILI_EMAIL_CONTADOR: string

    @Column()
      FILI_COD_MUNICIPIO_CONTADOR: number

    @Column()
      FILI_CGC_CONTADOR: string

    @Column()
      FILI_PEDIDO_SERV_QRP: string

    @Column()
      FILI_MOVIMENTACOES_QRP: string

    @Column()
      FILI_PEDIDO_PROD_QRP: string

    @Column()
      FILI_PREST_SERV_OBRA: string

    @Column()
      FILI_IMP_TOTAL_VENDA: number

    @Column()
      FILI_BOLETIM_LOCACAO_QRP: string

    @Column()
      FILI_BOLETIM_LOC_AGRUPADO_QRP: string

    @Column()
      FILI_CPF:string
}
