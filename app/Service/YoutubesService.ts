import { inject } from '@adonisjs/fold'

import * as ytubes from 'ytubes'

@inject()
export default class YoutubesService {
  constructor() {}

  async shorts(channelId?: string) {
    return await ytubes.getChannelShorts(channelId ?? '@The_FirstTake')
  }
}
