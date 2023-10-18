import { LucidModel, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { Repository } from 'App/Decorator/Repository'
import User from 'App/Models/User'
import BaseRepository from './BaseRepository'

@Repository(User)
export default class UserRepository extends BaseRepository<typeof User> {
  whereBuilder(query: ModelQueryBuilderContract<LucidModel>, {}) {
    return query
  }
}
