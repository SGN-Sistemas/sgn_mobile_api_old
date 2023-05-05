import {
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'REL_USUARIO_SUBCONTA', synchronize: false })
export class REL_USUARIO_SUBCONTA {
    @PrimaryColumn()
      REUS_USUA_COD:number

    @PrimaryColumn()

      REUS_SUCC_COD:number
}
