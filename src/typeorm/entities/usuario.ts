import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm'

@Entity({ name: 'USUARIO', synchronize: false })
export class USUARIO {
  @Column()
    USUA_CONSULTA_CLIENTE: string

  @Column()
    USUA_ALTERA_VALOR_UNITARIO: string

  @Column()
    USUA_CONSULTA_FORNECEDOR: string

  @Column()
    USUA_ACESSA_CREDITO_CLIENTE: string

  @Column()
    usua_altera_solic: string

  @Column()
    USUA_CADASTRA_LIMITE_CREDITO: string

  @PrimaryColumn()
    USUA_COD: number

  @Column()
    usua_aprova_solic: string

  @Column()
    usua_encerra_solic: string

  @Column()
    USUA_ALTERA_LIMITE_CREDITO: string

  @Column()
    USUA_SENHA: string

  @Column()
    usua_valor_aprov_solic: number

  @Column()
    usua_grupo_aprovacao_solic: string

  @Column()
    USUA_PERCENTUAL_LIMITE_CREDITO: number

  @Column()
    USUA_SIGLA: string

  @Column()
    USUA_CANCELA_VENDA: string

  @Column()
    USUA_CHECA_CLIENTE_DEBITO: string

  @Column()
    USUA_TIPO: string

  @Column()
    USUA_NOME: string

  @Column()
    USUA_CHECA_LIMITE_CREDITO: string

  @Column()
    USUA_APROVA_PEDIDO: string

  USUA_ALTERA_PEDIDO: string
  @Column()
    USUA_GRUPO_APROVACAO: string

  @Column()
    USUA_VALOR_APROVACAO: number

  @Column()
    USUA_BLOQ: string

  @Column()
    USUA_PESS_COD: number

  @Column()
    USUA_ENCERRA_PEDIDO: string

  @Column()
    USUA_APROVA_PEDIDO_VENDA: string

  @Column()
    USUA_APROVA_VENDA: string

  @Column()
    USUA_GRUPO_APROVACAO_VENDA: string

  @Column()
    USUA_VALOR_APROVACAO_VENDA: number

  @Column()
    USUA_AUTORIZA_PAGAMENTO: string

  @Column()
    USUA_ALTERA_VENC_MINIMO: string

  @Column()
    USUA_ATENDE_PEDIDO_VENDA: string

  @Column()
    USUA_LIBERA_LIM_ORCFIN: string

  @Column()
    USUA_CANCELA_PEDIDO_VENDA: string

  @Column()
    USUA_EXCLUI_PEDIDO_VENDA: string

  @Column()
    USUA_EFETUA_RENEGOCIACAO: string

  @Column()
    USUA_ALTERA_TR_QUITADA: string

  @Column()
    USUA_ALTERA_STATUS_PARCELA_PG: string

  @Column()
    USUA_ALTERA_PARCELA_IMOB: string

  @Column()
    USUA_MUDA_VENDEDOR_VENDA_EFET: string

  @Column()
    USUA_ALTERA_COMISSAO_VENDA: string

  @Column()
    USUA_PERM_ALTERAR_ORCAMENTO: string

  @Column()
    USUA_EXCLUI_DOC_FISCAL_CANC: string

  @Column()
    USUA_ALTERAR_PEDIDO_APROVADO: string

  @Column()
    USUA_GENERICO1: string

  @Column()
    USUA_GENERICO2: string

  @Column()
    USUA_EXCLUI_ORCA_COMPRAS: string

  @Column()
    USUA_AUTORIZ_REQ_PED_VEND: string

  @Column()
    USUA_ALTERA_REQ_PROG: string

  @Column()
    USUA_ALTERA_VENC_RENE_PARCELA: string

  @Column()
    USUA_APROVA_DEMONSTRATIVO: string

  @Column()
    USUA_ALTERA_VLR_TR_PEDIDO: string

  @Column()
    USUA_ALTERA_VLR_TR_COMPRA: string

  @Column()
    USUA_ALTERA_REQ: string

  @Column()
    USUA_APROVA_REQ: string

  @Column()
    USUA_ENCERRA_REQ: string

  @Column()
    USUA_VALOR_APROV_REQ: number

  @Column()
    USUA_GRUPO_APROVACAO_REQ: string

  @Column()
    USUA_CANCELA_CARTA: string

  @Column()
    USUA_EXCLUI_REQ_APROV: string

  @Column()
    USUA_APROVA_CONTRATO: string

  @Column()
    USUA_GRUPO_APROVA_CONTRATO: string

  @Column()
    USUA_ALTERA_CONTRATO: string

  @Column()
    USUA_ENCERRA_CONTRATO: string

  @Column()
    USUA_DESBLOQUEIA_FORN: string

  @Column()
    USUA_ENVIA_EMAIL_PEDIDO: string

  @Column()
    USUA_EMITE_NFE_CONTINGENCIA: string

  @Column()
    USUA_PERMITE_DESAGIO: string

  @Column()
    USUA_AUTORIZA_COMPRA_CM: string

  @Column()
    USUA_ALTERA_DADOS_COMERCIAIS: string

  @Column()
    USUA_EXIBE_ATUALIZACAO: string

  @Column()
    USUA_EMAIL: string

  @Column()
    USUA_CONS_IMP_PED: string

  @Column()
    USUA_BLOQUEIA_CLIENTE: string

  @Column()
    USUA_IMP_CONT_SERV_SEM_APROV: string

  @Column()
    USUA_ENVIA_EMAIL_CONTRATO: string

  @Column()
    USUA_IMP_PEDIDO_NAO_APROVADO: string

  @Column()
    USUA_EFETIVA_SUBCONT: string

  @Column()
    USUA_LIBERA_PEDIDO: string

  @Column()
    USUA_HORA_LIMITE_RN: string

  @Column()
    USUA_APROVA_BOLETIM: string

  @Column()
    USUA_GRUPO_APROVA_BOLETIM: string

  @Column()
    USUA_ALTERA_BOLETIM: string

  @Column()
    USUA_ENCERRA_BOLETIM: string

  @Column()
    USUA_ALTERA_TR_RN: string

  @Column()
    USUA_VALOR_APROVA_CONT_SERV: number

  @Column()
    USUA_NAO_ALTERA_PCG_RECEB: string

  @Column()
    USUA_QUITAR_CONTRATO_AUTO: string

  @Column()
    USUA_AP_PED_CLIE_DEV: string

  @Column()
    USUA_RECEBE_ALERTA_REAJUSTE: string

  @Column()
    USUA_RECEBE_ALERTA_TERMINO: string

  @Column()
    USUA_ALTERA_VALOR_MATERIAL: string

  @Column()
    USUA_CONFIRMA_VENDA_VISTA: string

  @Column()
    USUA_ALTERA_DESCONTO: string

  @Column()
    USUA_ALTERA_CREDITO_CP: string

  @Column()
    USUA_AUDITORIA_CONT_IMOB: string

  @Column()
    USUA_ALTERA_PEDIDO_VENDA: string

  @Column()
    USUA_EXCLUI_CHEQUE_EMITIDO: string

  @Column()
    USUA_EXCLUI_CHEQUE_CANC: string

  @Column()
    USUA_ALTERA_ITPCG_SUB_CONTRATO: string

  @Column()
    USUA_PERMITE_IMPRIMIR_RN: string

  @Column()
    USUA_REGISTRA_VISTORIA: string

  @Column()
    USUA_ALTERA_CLIENTE_PED_PEND: string

  @Column()
    USUA_ASSINATURA_ELET: string

  @Column()
    USUA_LIMITE_DIA_EMISSAO: number

  @Column()
    USUA_CANCELA_CHEQUE: string

  @Column()
    USUA_ALTERA_DT_ENTREGA_PED: string

  @Column()
    USUA_EXCLUI_BAIXA_IMOB: string

  @Column()
    USUA_EXCLUI_TRANSF_BANCARIA: string

  @Column()
    USUA_PENDENCIA_ATENDIMENTO: string

  @Column()
    USUA_ALTERA_QTD_PED_VENDA: string

  @Column()
    USUA_LIBERA_PED_SEM_PARCELA: string

  @Column()
    USUA_ALERTA_REQ_PONTO_MIN: string

  @Column()
    USUA_DT_INI_POS_FECH: Date

  @Column()
    USUA_DT_FIM_POS_FECH: Date

  @Column()
    USUA_VALOR_APROVACAO_MENSAL: number

  @Column()
    USUA_SALV_ALT_TRANSACAO: string

  @Column()
    USUA_BLOQ_DT_BASE: string

  @Column()
    USUA_ALTERA_EXCLUI_ORC: string

  @Column()
    USUA_EXCLUI_SOLIC: string

  @Column()
    USUA_APROVA_PLAN: string

  @Column()
    USUA_GRUPO_APROVACAO_PLAN: string

  @Column()
    USUA_PERMITE_ABONO: string

  @Column()
    USUA_ACESSA_COMISSAO_VEND: string

  @Column()
    USUA_REL_FORN_USUA_CR: string

  @Column()
    USUA_CARGO_LOCAL_TRABALHO: string

  @Column()
    USUA_DESAPROVA_PLANILHA: string

  @Column()
    USUA_GRUPO_PROD_SERV: string

  @Column()
    USUA_PERMITE_CONCILIACAO: string

  @Column()
    USUA_ALERA_UNID_BOLETIM: string

  @Column()
    USUA_ACESSA_NOVO_CR: string

  @Column()
    USUA_ACESSA_NOVO_CC: string

  @Column()
    USUA_PERMITE_FECH_CONTAB: string

  @Column()
    USUA_PERMI_EXCLUI_CONTRATO: string

  @Column()
    USUA_PERMI_EFETIVA_CONTRATO: string

  @Column()
    USUA_UTILIZA_QUANT_CONT: string

  @Column()
    USUA_CONS_IMP_SERV: string

  @Column()
    USUA_ALTERA_CHAVE_NF: string

  @Column()
    USUA_ALERTA_REQ_PROG_CAD: string

  @Column()
    USUA_CONS_PROD: string

  @Column()
    USUA_CAD_FORN_BLOQ: string

  @Column()
    USUA_ALTERA_APLIC_REQ_ATEND: string

  @Column()
    USUA_APROVA_FORN: string

  @Column()
    USUA_VALIDA_DOC_FORN: string

  @Column()
    USUA_GRUPO_APROV_FORN: string

  @Column()
    USUA_IMP_PEDI_OBS_SOLI: string

  @Column()
    USUA_PERMITE_EXCLUI_TRPG: string

  @Column()
    USUA_APROV_SUP_FORN_CONT: string

  @Column()
    USUA_BLOQUEIA_CR_RECEBIMENTO: string

  @Column()
    USUA_IMPRIME_SOLI_PEDI_EXIST: string

  @Column()
    USUA_VALIDA_DOC_CONT: string

  @Column()
    USUA_PERMITE_ESTORNO: string

  @Column()
    USUA_ALTERA_JUROS_CORRE_EA: string

  @Column()
    USUA_INCLUIEXCLUI_DOC_ANEXO: string

  @Column()
    USUA_ALTERA_FORN_RECEB: string

  @Column()
    USUA_CADASTRA_VALOR_INDICE: string

  @Column()
    USUA_IMPRIME_SOLICITACAO: string

  @Column()
    USUA_DESAPROVA_BOLETIM: string

  @Column()
    USUA_ALERTA_ATRASO_SERVICO: string

  @Column()
    USUA_ALTERA_STATUS_CONTRATO_QT: string

  @Column()
    USUA_APROV_DOC_CONT_SERV: string

  @Column()
    USUA_GRUPO_APROV_DOC_CONT: string

  @Column()
    USUA_CONFERE_DOCUMENTO: string

  @Column()
    USUA_INCLUI_DOC_ANEXO: string

  @Column()
    USUA_EXCLUI_DOC_ANEXO: string

  @Column()
    USUA_MARGEM_PEDIDO: number

  @Column()
    USUA_MARGEM_RECEBIMENTO: number

  @Column()
    USUA_IMPRIME_BOLETIM_NAO_APROV: string

  @Column()
    USUA_ALTERA_PARCELA_PEDIDO: string

  @Column()
    USUA_PERMITE_BAIXA_IMOB: string

  @Column()
    USUA_CHECA_CLIENTE_DEBITO_ORC: string

  @Column()
    USUA_NAO_UNID_MED_SOLIC: string

  @Column()
    USUA_ALTERA_VLR_TR_PEDI_VENDA: string

  @Column()
    USUA_ALTERA_VLR_TR_VENDA: string

  @Column()
    USUA_COMPRA_PROD_CONT: string

  @Column()
    USUA_APROVA_PROD_CONT: string

  @Column()
    USUA_APROV_DOC_BOL: string

  @Column()
    USUA_GRUPO_APROV_DOC_BOL: string

  @Column()
    USUA_NAO_CONT_SALDO_CONT: string

  @Column()
    USUA_TITULOS_VENCIDOS: string

  @Column()
    USUA_INCLUI_ADITIVO: string

  @Column()
    USUA_INCLUIR_DOC_CONT: string

  @Column()
    USUA_LIBERA_CONFISSAO: string

  @Column()
    USUA_EXCLUIR_RECEB: string

  @Column()
    USUA_RECEB_COM_FECHAMENTO: string

  @Column()
    USUA_LIB_JR_RENEGOC: string

  @Column()
    USUA_REABRE_CONTRATO_SERV: string

  @Column()
    USUA_CONFERE_TRPG: string

  @Column()
    USUA_SENHA_APP: string
}
