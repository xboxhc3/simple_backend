import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SignUpValidator } from 'App/Validators/SignUpValidator'

import UserService from 'App/Service/UserService'

@inject()
export default class UserController {
  constructor(private userService: UserService) {}

  async greeting() {
    return { welcome: 1 }
  }

  async signUp({ request }: HttpContextContract) {
    return await this.userService.signUp(await request.classValidate(SignUpValidator))
  }
}
