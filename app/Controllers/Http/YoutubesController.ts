import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import YoutubesService from 'App/Service/YoutubesService'

@inject()
export default class YoutubesController {
  constructor(private youtubesService: YoutubesService) {}

  async shorts({ params: { channelId } }: HttpContextContract) {
    return await this.youtubesService.shorts(channelId)
  }
}
