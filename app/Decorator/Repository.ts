import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

export function Repository(model: LucidModel) {
  return function (target) {
    target.sourceModel = model
  }
}
