import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';
import { selectServiceContract1, selectServiceContract2, selectServiceContract3, selectServiceContract4 } from '../../queries/serviceContract';

interface ICocs{
  COCS_DT_INICIO:string
  COCS_DT_FIM: string,
  COCS_FORN_COD: string,
  COCS_CERE_COD: string,
  COCS_SERV_COD: string,
  COCS_TERC_COD: string,
  COCS_QUANTIDADE: string,
  COCS_VLR_UNIT: string,
  COCS_FORMA_PAGAMENTO: string,
  COCS_PRAZO: string,
  COCS_EMPR_COD: string,
  COCS_FILI_COD: string,
  COCS_DATA_APROVACAO1: string,
  COCS_DT_CONTRATO: string,
  COCS_TIPO_MEDICAO: string,
  SERV_DESC: string,
  FORN_NOME: string,
  ASS: string
}

export class ListServiceContractServices {
  public async execute (userId: number, queryString: string): Promise<ICocs[]> {

    const sql = selectServiceContract1(userId + '', queryString);
    const sql2 = selectServiceContract2(userId + '', queryString);
    const sql3 = selectServiceContract3(userId + '', queryString);
    const sql4 = selectServiceContract4(userId + '', queryString);

    const array: ICocs[] = [];
    const listContract1 = await PedidoEstoqueRepository.query(sql);
    const listContract2 = await PedidoEstoqueRepository.query(sql2);
    const listContract3 = await PedidoEstoqueRepository.query(sql3);
    const listContract4 = await PedidoEstoqueRepository.query(sql4);

    if (listContract1.length > 0) {
      listContract1.map((pos: ICocs) => array.push(pos));
    }

    if (listContract2.length > 0) {
      listContract2.map((pos: ICocs) => array.push(pos));
    }

    if (listContract3.length > 0) {
      listContract3.map((pos: ICocs) => array.push(pos));
    }

    if (listContract4.length > 0) {
      listContract4.map((pos: ICocs) => array.push(pos));
    }

    return array;
  }
}
