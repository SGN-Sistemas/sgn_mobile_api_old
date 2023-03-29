import dotenv from 'dotenv'

dotenv.config()

export class VerfifyVersion {
  public async execute (version: number, platform: string): Promise<object> {
    const versionAndroid = parseInt(process.env.VERSION_ANDROID + '')
    const versionIos = parseInt(process.env.VERSION_IOS + '')
    let message = 'atualizado'
    let link = ''

    if (platform === 'android' && version < versionAndroid) {
      message = 'desatualizado'
      link = 'https://play.google.com/store/apps/details?id=com.sgn.inova.nucleoincentivar'
    }

    if (platform === 'ios' && version < versionIos) {
      message = 'desatualizado'
      link = 'https://play.google.com/store/apps/details?id=com.sgn.inova.nucleoincentivar'
    }

    return {
      message,
      link
    }
  }
}
