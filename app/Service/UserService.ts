import { inject } from '@adonisjs/fold'
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserRepository from 'App/Repository/UserRepository'

@inject()
export default class UserService {
  constructor(private userRep: UserRepository) {}

  async signUp({ email, password, name }) {
    return await this.userRep.create({ email, password, name })
  }
}
