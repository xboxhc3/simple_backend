/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CommonCodes } from 'App/Constants/ApiCode/CommonCodes'
import { ApiFacadeInterface } from 'App/Middleware/ApiFacade'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  private HttpException(error: Exception): ApiFacadeInterface {
    return { code: [CommonCodes.ROUTE_NOT_FOUND], data: { message: error.message } }
  }

  private ValidationException(error): ApiFacadeInterface {
    const numbers = error.messages.errors.filter((x) => !isNaN(parseFloat(x.message)))
    const messages = error.messages.errors.map(({ field, message }) => ({ field, message }))
    const code = numbers.length
      ? numbers.map((x) => +x.message)
      : [CommonCodes.VALIDATOR_MESSAGE_NOT_DEFINED]
    return { code, data: { messages } }
  }

  private ApiException(error: Exception): ApiFacadeInterface {
    return { code: [error.status], data: { message: error.message } }
  }

  public async handle(error: Exception, { response }: HttpContextContract): Promise<any> {
    response.status(200).send(
      this[error.name]
        ? this[error.name](error)
        : {
            code: [CommonCodes.UNEXPECTED_ERROR],
            data: {
              name: error.name,
              message: error.message,
            },
          }
    )
  }
}
