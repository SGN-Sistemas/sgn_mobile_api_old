import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm'

@Entity({ name: 'PEDIDO_ESTOQUE', synchronize: false })
export class PEDIDO_ESTOQUE {
    @PrimaryColumn()
      PEDI_COD: number

    @Column()
      PEDI_TIPO: string

    @Column()
      PEDI_SECO_COD: number

    @Column()
      PEDI_USUA_COD_CANCELA: number

    @Column()
      PEDI_USUA_COD_ASS_1: number

    @Column()
      PEDI_DTENTREGA: Date

    @Column()
      PEDI_USUA_COD_ASS_2: number

    @Column()
      PEDI_FILI_COD: number

    @Column()
      PEDI_PESS_COD: number

    @Column()
      PEDI_TRAN_COD: number

    @Column()
      PEDI_CLIE_COD: number

    @Column()
      PEDI_LOCA_COD: number

    @Column()
      PEDI_EMPR_COD: number

    @Column()
      PEDI_FORN_COD: number

    @Column()
      PEDI_DATA: Date

    @Column()
      PEDI_NUMERO: string

    @Column()
      PEDI_TOTAL_MERC: number

    @Column()
      PEDI_OBS: string

    @Column()
      PEDI_DESCONTO: number

    @Column()
      PEDI_TIPO_FRETE: string

    @Column()
      PEDI_STATUS: string

    @Column()
      PEDI_FRETE: number

    @Column()
      PEDI_BASE_IPI: number

    @Column()
      PEDI_VALOR_IPI: number

    @Column()
      PEDI_ASSINATURA_1: string

    @Column()
      PEDI_ASSINATURA_2: string

    @Column()
      PEDI_EMBALAGEM: number

    @Column()
      PEDI_VALOR_APROVADO: number

    @Column()
      PEDI_VEIC_COD: number

    @Column()
      PEDI_COVE_COD: number

    @Column()
      PEDI_PLPA_COD: number

    @Column()
      PEDI_ENDERECO_ENTREGA: string

    @Column()
      PEDI_BAIRRO_ENTREGA: string

    @Column()
      PEDI_CIDADE_ENTREGA: string

    @Column()
      PEDI_CEP_ENTREGA: string

    @Column()
      PEDI_TEL_ENTREGA: string

    @Column()
      PEDI_CONTATO_ENTREGA: string

    @Column()
      PEDI_UNFE_SIGLA_ENTREGA: string

    @Column()
      PEDI_VENCIMENTO_FRETE: Date

    @Column()
      PEDI_VIAGENS_FRETE: number

    @Column()
      PEDI_FRETE_NOTA: string

    @Column()
      PEDI_OBS_FIANCEIRO: string

    @Column()
      PEDI_TIPO_DOC_FINANCEIRO: string

    @Column()
      PEDI_TIPO_OPERACAO: string

    @Column()
      PEDI_MOTI_COD: number

    @Column()
      PEDI_ENCERRADO: string

    @Column()
      PEDI_USUA_COD_APROVA: number

    @Column()
      PEDI_USUA_COD: number

    @Column()
      PEDI_LOCA_COBRANCA_COD: number

    @Column()
      PEDI_TAPR_COD: number

    @Column()
      PEDI_DTORIGEM: Date

    @Column()
      PEDI_VALOR_TOTAL: number

    @Column()
      PEDI_TASE_COD: number

    @Column()
      PEDI_AGVE_COD: number

    @Column()
      PEDI_HORA_ENTREGA: Date

    @Column()
      PEDI_DATA_REALIZACAO: Date

    @Column()
      PEDI_HORA_REALIZACAO: Date

    @Column()
      PEDI_CLAF_COD: number

    @Column()
      PEDI_SOMENTE_ENTREGA: string

    @Column()
      PEDI_COM_INSTALACAO: string

    @Column()
      PEDI_DATA_DESMONTAGEM: string

    @Column()
      PEDI_GUARDAR_MATERIAL: string

    @Column()
      PEDI_VOLTAGEM: string

    @Column()
      PEDI_ACABAMENTO: string

    @Column()
      PEDI_NOME_RESP_RECEBIMENTO_NF: string

    @Column()
      PEDI_NOME_RESP_LOCAL: string

    @Column()
      PEDI_TEL_RESP_LOCAL: string

    @Column()
      PEDI_TEL_RESP_RECEBIMENTO_NF: string

    @Column()
      PEDI_CONTATO: string

    @Column()
      PEDI_RETIRADA_EMPRESA: string

    @Column()
      PEDI_INAUGURACAO_EVENTO: string

    @Column()
      PEDI_ENTREGA_APOS_DESMONTAGEM: string

    @Column()
      PEDI_CIDA_ENTR_COD: number

    @Column()
      PEDI_BAIR_ENTR_COD: number

    @Column()
      PEDI_DATA_APROVACAO1: Date

    @Column()
      PEDI_DATA_APROVACAO2: Date

    @Column()
      pedi_total_servico: number

    @Column()
      PEDI_VALOR_ISENTAS: number

    @Column()
      PEDI_VALOR_OUTRAS: number

    @Column()
      PEDI_VENDA_DIRETA: string

    @Column()
      PEDI_GERADO_RECEBER: string

    @Column()
      PEDI_CERE_COD_PRODUTO: number

    @Column()
      PEDI_CERE_COD_SERVICO: number

    @Column()
      PEDI_ITPC_COD_PRODUTO: number

    @Column()
      PEDI_ITPC_COD_SERVICO: number

    @Column()
      PEDI_GENE_COD: number

    @Column()
      PEDI_OBS_FRETE: string

    @Column()
      PEDI_TRPG_COD_FRETE: number

    @Column()
      PEDI_LOCAL_AUXILIAR: string

    @Column()
      PEDI_END_AUXILIAR: string

    @Column()
      PEDI_PRAZO_ENT_AUXILIAR: string

    @Column()
      PEDI_CIDADE_AUXILIAR: string

    @Column()
      PEDI_ESTADO_AUXILIAR: string

    @Column()
      PEDI_GESI_PEDIDO_COD: number

    @Column()
      PEDI_PRESTACAO_GARANTIA: string

    @Column()
      PEDI_TIPO_GARANTIA: string

    @Column()
      PEDI_TIPO_ENTREGA: string

    @Column()
      PEDI_TIPO_RETIRADA: string

    @Column()
      PEDI_PACI_COD: number

    @Column()
      PEDI_MEDI_COD: number

    @Column()
      PEDI_CONV_COD: number

    @Column()
      PEDI_DATA_CIRURGIA: Date

    @Column()
      PEDI_PERC_DESCONTO_DUPLICATA: number

    @Column()
      PEDI_DATA_INICIO: Date

    @Column()
      PEDI_MEDI_CIRURGIAO_COD: number

    @Column()
      PEDI_PRAZO_PAGAMENTO: number

    @Column()
      PEDI_TERC_COD: number

    @Column()
      PEDI_NUM_COLETA: string

    @Column()
      PEDI_FORMA_PAG_SERV: string

    @Column()
      PEDI_PRAZO_EXECUCAO: string

    @Column()
      PEDI_OBS_COMP: string

    @Column()
      PEDI_COCS_COD: number

    @Column()
      PEDI_EMAIL: string

    @Column()
      PEDI_CLIE_COD_COBRANCA: number

    @Column()
      PEDI_NUM_PED_AGENCIA: string

    @Column()
      PEDI_COBRANCA_AGENCIA: string

    @Column()
      PEDI_COD_CORRESPONDENTE: number

    @Column()
      PEDI_USUA_COD_ASS_3: number

    @Column()
      PEDI_USUA_COD_ASS_4: number

    @Column()
      PEDI_ASSINATURA_3: string

    @Column()
      PEDI_ASSINATURA_4: string

    @Column()
      PEDI_DATA_APROVACAO3: Date

    @Column()
      PEDI_DATA_APROVACAO4: Date

    @Column()
      PEDI_DESCARGA_MAT: string

    @Column()
      PEDI_COMPRA_PIOR_PRECO: string

    @Column()
      PEDI_HORARIO_INST: string

    @Column()
      PEDI_OBS_PAGAMENTO: string

    @Column()
      PEDI_COMISSAO_AG: number

    @Column()
      PEDI_COMISSAO_AGENCIA: number

    @Column()
      PEDI_DATA_ASS_1: Date

    @Column()
      PEDI_DATA_ASS_2: Date

    @Column()
      PEDI_RENOVACAO: string

    @Column()
      PEDI_IMPRIMIR_VIAS: string

    @Column()
      USUA_SENHA_APP:string
}
