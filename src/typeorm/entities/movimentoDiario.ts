import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'MOVIMENTO_DIARIO', synchronize: false })
export class MOVIMENTO_DIARIO {
    @PrimaryColumn()
      MODI_DATA: Date

    @Column()
      MODI_SUCC_COD: number

    @Column()
      MODI_SALDO_ANTES: number

    @Column()
      MODI_CREDITO: number

    @Column()
      MODI_DEBITO: number
}
