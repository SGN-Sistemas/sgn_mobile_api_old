export const approvalTrpp = (
  RETU_USUA_COD: string,
  RETU_TRPP_COD: string,
  database: string
) => {
  return `
    USE [${database}]
    INSERT INTO
        REL_TRPP_USUA
            (
                RETU_USUA_COD,
                RETU_TRPP_COD,
                RETU_DATA
            )
    VALUES
        (
            ${RETU_USUA_COD},
            ${RETU_TRPP_COD},
            getdate()
        )
  `
}

export const selectTrpg = (usuaCod: string, autorizacaoCount: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    Select
        trpg_cod,
        trpg_empr_cod,
        empr_nome,
        trpg_forn_cod,
        forn_nome,
        trpg_tipo_doc,
        trpg_sttr_cod,
        sttr_desc,
        trpg_num_doc,
        trpg_obs,
        trpg_dtemis,
        forn_aliquota_ir_pj,
        trpg_valbruto,
        trpg_dtorigem,
        trpg_rate_cod,
        trpg_valjur,
        trpg_valmulta,
        trpg_valdesconto,
        trpg_dtrecebimento,
        trpp_sigla, 
        trpp_cere_cod, 
        trpp_dtvenc, 
        trpp_itpc_cod, 
        trpp_obs, 
        trpp_sttr_cod, 
        trpp_valdesc, 
        trpp_valjur, 
        trpp_valprev,
        trpp_cod,
        cere_sigla ,
        cere_nome,
        itpc_sigla ,
        itpc_desc
    FROM
        tr_parcela_pg,
        centro_resultado,
        item_pcg,
        status_transacao,
        empresa, fornecedor,
        transacao_pg,
        USUARIO_CR
    where
        trpg_sttr_cod = sttr_cod
    and
        trpg_empr_cod = empr_cod
    and
        trpg_forn_cod = forn_cod
    and
        trpp_cere_cod = cere_cod
    AND
        trpp_itpc_cod = itpc_cod
    AND
        trpp_trpg_cod = trpg_cod
    AND
        trpp_cere_cod = USCR_CERE_COD
    AND
        USCR_USUA_COD = ${usuaCod}
    AND
        USCR_AUTORIZA = 'S'

    AND
        (

            SELECT
                COUNT(RETU_DATA)
            FROM
               REL_TRPP_USUA
            WHERE
                RETU_TRPP_COD = trpp_cod
            AND
                RETU_USUA_COD = ${usuaCod}
        )   
    <
        ${autorizacaoCount}
    ${queryString}

  `
}
