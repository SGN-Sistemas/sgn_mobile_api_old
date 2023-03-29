import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'EMPRESA', synchronize: false })
export class EMPRESA {
    @PrimaryColumn()
      EMPR_COD: number

    @Column()
      EMPR_NOME: string

    @Column()
      EMPR_FONE: string

    @Column()
      EMPR_FAX: string

    @Column()
      EMPR_BAIRRO: string

    @Column()
      EMPR_CONTATO: string

    @Column()
      EMPR_UNFE_SIGLA: string

    @Column()
      EMPR_IM: string

    @Column()
      EMPR_IE: string

    @Column()
      EMPR_END: string

    @Column()
      EMPR_CIDADE: string

    @Column()
      EMPR_CGC: string

    @Column()
      EMPR_CEP: string

    @Column()
      EMPR_QRP: string

    @Column()
      EMPR_QRP_PROMIS: string

    @Column()
      EMPR_REDUZ_INSS: number

    @Column()
      EMPR_REDUZ_ISS: number

    @Column()
      EMPR_REDUZ_IR: number

    @Column()
      EMPR_NUMERO_PROSOFT: string

    @Column()
      EMPR_EMAIL: string

    @Column()
      EMPR_REDUZ_RETENC1: number

    @Column()
      EMPR_REDUZ_RETENC2: number

    @Column()
      EMPR_REDUZ_CLIE_INSS: number

    @Column()
      EMPR_REDUZ_CLIE_IR: number

    @Column()
      EMPR_REDUZ_CLIE_ISS: number

    @Column()
      EMPR_REDUZ_CLIE_PIS: number

    @Column()
      EMPR_REDUZ_CLIE_COFINS: number

    @Column()
      EMPR_REDUZ_CLIE_SOCIAL: number

    @Column()
      EMPR_REDUZ_CLIE_RETENC1: number

    @Column()
      EMPR_REDUZ_CLIE_RETENC2: number

    @Column()
      EMPR_CIDA_COD: number

    @Column()
      EMPR_BAIR_COD: number

    @Column()
      EMPR_REDUZ_EMPRESTIMO: number

    @Column()
      EMPR_REDUZ_PIS: number

    @Column()
      EMPR_REDUZ_COFINS: number

    @Column()
      EMPR_REDUZ_CSSL: number

    @Column()
      EMPR_GERA_LANC_CLIE_INSS: string

    @Column()
      EMPR_GERA_LANC_CLIE_IR: string

    @Column()
      EMPR_GERA_LANC_CLIE_ISS: string

    @Column()
      EMPR_GERA_LANC_CLIE_PIS: string

    @Column()
      EMPR_GERA_LANC_CLIE_COFINS: string

    @Column()
      EMPR_GERA_LANC_CLIE_SOCIAL: string

    @Column()
      EMPR_GERA_LANC_CLIE_RETENC1: string

    @Column()
      EMPR_GERA_LANC_CLIE_RETENC2: string

    @Column()
      EMPR_DESC_MICRO: number

    @Column()
      EMPR_REDUZ_COD: number

    @Column()
      EMPR_REDUZ_INSS_PF: number

    @Column()
      EMPR_REDUZ_IR_PF: number

    @Column()
      EMPR_REDUZ_ISS_PF: number

    @Column()
      EMPR_REDUZ_RETENC1_PF: number

    @Column()
      EMPR_REDUZ_RETENC2_PF: number

    @Column()
      EMPR_REDUZ_PIS_PF: number

    @Column()
      EMPR_REDUZ_COFINS_PF: number

    @Column()
      EMPR_REDUZ_CSSL_PF: number

    @Column()
      EMPR_REDUZ_CLIE_INSS_PF: number

    @Column()
      EMPR_REDUZ_CLIE_IR_PF: number

    @Column()
      EMPR_REDUZ_CLIE_ISS_PF: number

    @Column()
      EMPR_REDUZ_CLIE_RETENC1_PF: number

    @Column()
      EMPR_REDUZ_CLIE_RETENC2_PF: number

    @Column()
      EMPR_REDUZ_CLIE_PIS_PF: number

    @Column()
      EMPR_REDUZ_CLIE_COFINS_PF: number

    @Column()
      EMPR_REDUZ_CLIE_SOCIAL_PF: number

    @Column()
      EMPR_NIVEL_FEDERAL: string

    @Column()
      EMPR_TIPO_SIMPLES: string

    @Column()
      EMPR_CLASSIFICACAO_SIMPLES: string

    @Column()
      EMPR_ATV_EXCLUSIVA_INDUSTRIAL: string

    @Column()
      EMPR_LOGO: string

    @Column()
      EMPR_EMAIL_SMTP: string

    @Column()
      EMPR_EMAIL_SENHA: string

    @Column()
      EMPR_EMAIL_USUARIO: string

    @Column()
      EMPR_GERA_LANC_FORN_INSS: string

    @Column()
      EMPR_GERA_LANC_FORN_IR: string

    @Column()
      EMPR_GERA_LANC_FORN_ISS: string

    @Column()
      EMPR_GERA_LANC_FORN_PIS: string

    @Column()
      EMPR_GERA_LANC_FORN_COFINS: string

    @Column()
      EMPR_GERA_LANC_FORN_SOCIAL: string

    @Column()
      EMPR_GERA_LANC_FORN_RETENC1: string

    @Column()
      EMPR_GERA_LANC_FORN_RETENC2: string

    @Column()
      EMPR_GERA_TERCEIRO_RETENC: string

    @Column()
      EMPR_CARTA_COBR: string

    @Column()
      EMPR_TIPO_ATIVIDADE: string

    @Column()
      EMPR_NIRE: string

    @Column()
      EMPR_CONTRATO_SOCIAL: number

    @Column()
      EMPR_DATA_CONTRATO_SOCIAL: Date

    @Column()
      EMPR_SIGLA: string

    @Column()
      EMPR_CAPITAL_SOCIAL: number

    @Column()
      EMPR_DATA_CONST_REGISTRO: Date

    @Column()
      EMPR_IND_BLOQ: string

    @Column()
      EMPR_GERA_TERCEIRO_IR: string

    @Column()
      EMPR_GERA_TERCEIRO_ISS: string

    @Column()
      EMPR_GERA_TERCEIRO_INSS: string

    @Column()
      EMPR_GERA_TERCEIRO_PIS: string

    @Column()
      EMPR_GERA_TERCEIRO_COFINS: string

    @Column()
      EMPR_GERA_TERCEIRO_SOCIAL: string

    @Column()
      EMPR_GERA_TERCEIRO_RETENC1: string

    @Column()
      EMPR_GERA_TERCEIRO_RETENC2: string

    @Column()
      EMPR_NATUREZA_JURIDICA: string

    @Column()
      EMPR_OBRIG_ECD: string

    @Column()
      EMPR_OBRIG_CPRB: string

    @Column()
      EMPR_ACORDO_MULTA: string

    @Column()
      EMPR_SITUACAO_PJ: string

    @Column()
      EMPR_CLTR_COD: number

    @Column()
      EMPR_SITUACAO_ESPECIAL_PJ: string

    @Column()
      EMPR_FORN_COD: number

    @Column()
      EMPR_CLIE_COD: number

    @Column()
      EMPR_ATV_CPRB: string

    @Column()
      EMPR_FATOR_PREV: number

    @Column()
      EMPR_R2010: string

    @Column()
      EMPR_R2020: string

    @Column()
      EMPR_R2060: string

    @Column()
      EMPR_INTERFACE_CONTABIL: string

    @Column()
      EMPR_CAMINHO_CONTABIL: string

    @Column()
      EMPR_CARGA_TRIBUTARIA: number

    @Column()
      EMPR_TIPO_INSC: string

    @Column()
      EMPR_LOTACAO_TRIBUTARIA: string

    @Column()
      EMPR_RUBRICA_EMP: string

    @Column()
      EMPR_RUBRICA_TAB: string

    @Column()
      EMPR_NAJU_COD: number

    @Column()
      EMPR_COOPERATIVA: string

    @Column()
      EMPR_CONSTRUTORA: string

    @Column()
      EMPR_PONTO_ELETRONICO: string

    @Column()
      EMPR_TRAB_TEMP: string

    @Column()
      EMPR_S1200: string

    @Column()
      EMPR_S1210: string

    @Column()
      EMPR_S1250: string

    @Column()
      EMPR_S1260: string

    @Column()
      EMPR_S1270: string

    @Column()
      EMPR_DATA_VALIDADE_CERT: Date

    @Column()
      EMPR_SCP_COD: string

    @Column()
      EMPR_CERTIFICADO: string

    @Column()
      EMPR_PROD_SGN: string

    @Column()
      EMPR_VALID_CPF: string

    @Column()
      EMPR_CPF: string
}
