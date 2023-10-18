import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from '@ioc:Adonis/Core/Config'
import ApiException from 'App/Exceptions/ApiException'
import { CommonCodes } from 'App/Constants/ApiCode/CommonCodes'

@inject()
export default class OAuthsController {
  constructor() {}

  async login({ ally, params }: HttpContextContract) {
    const allyConfig = Config.get('ally')
    if (params.provider in allyConfig) {
      return ally.use(params.provider).redirect()
    } else {
      throw new ApiException(CommonCodes.INVALID_OAUTH, `${params.provider} is invalid`)
    }
  }

  async callback({ ally, params }: HttpContextContract) {
    const provider = ally.use(params.provider)

    return await provider.user()
  }
}
