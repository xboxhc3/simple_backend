import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CommonCodes } from 'App/Constants/ApiCode/CommonCodes'

export interface ApiFacadeInterface {
  code: number[]
  data: any
  time?: string
}

export default class ApiFacade {
  public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const start: number = Date.now()

    await next()

    response.send({
      code: [CommonCodes.OK],
      data: response.lazyBody?.[0],
      time: Date.now() - start + ' ms',
    })
  }
}
