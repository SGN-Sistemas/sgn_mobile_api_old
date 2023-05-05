import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'APLICACAO_CONTA', synchronize: false })
export class APLICACAO_CONTA {
    @Column()
      APCO_NOME: string

    @PrimaryColumn()
      APCO_COD: string

    @Column()
      APCO_TIPO: string
}
