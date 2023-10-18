import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import {
  LucidModel,
  ModelAssignOptions,
  ModelAttributes,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import { CommonCodes } from 'App/Constants/ApiCode/CommonCodes'
import ApiException from 'App/Exceptions/ApiException'

export default abstract class BaseRepository<T extends LucidModel> {
  get staticSourceModel(): T {
    if (!this.constructor['sourceModel']) {
      throw new ApiException(
        CommonCodes.ERROR,
        'repository need use decorator to inject source model or define sourceModel'
      )
    }
    return this.constructor['sourceModel']
  }

  find(primaryKey) {
    return this.staticSourceModel.find(primaryKey)
  }

  findBy(propKey, primaryKey, options?) {
    return this.staticSourceModel.findBy(propKey, primaryKey, options)
  }

  findOrFail(primaryKey) {
    return this.staticSourceModel.findOrFail(primaryKey)
  }

  findByOrFail(propKey, primaryKey) {
    return this.staticSourceModel.findByOrFail(propKey, primaryKey)
  }

  query() {
    return this.staticSourceModel.query()
  }

  getList(
    body,
    myWhereBuilder?: (query: ModelQueryBuilderContract<T>, _body) => ModelQueryBuilderContract<T>
  ): ModelQueryBuilderContract<T> {
    const { offset, perPage, sortKey, sortType } = body
    const query = (myWhereBuilder || this.whereBuilder)(this.staticSourceModel.query(), body)
      .offset(offset)
      .limit(perPage)
    sortKey &&
      (sortKey.constructor == Array
        ? sortKey.forEach((_x, i) => {
            query.orderBy(sortKey[i], sortType[i])
          })
        : query.orderBy(sortKey, sortType))
    return query
  }

  getTotal(
    body = {},
    myWhereBuilder?: (query: ModelQueryBuilderContract<T>, _body) => ModelQueryBuilderContract<T>
  ): Promise<number> {
    return (myWhereBuilder || this.whereBuilder)(this.staticSourceModel.query(), body).getCount()
  }

  protected abstract whereBuilder(query: ModelQueryBuilderContract<T>, _body)

  mergeSave(row: InstanceType<T>, body: Partial<ModelAttributes<InstanceType<T>>>) {
    this.trx && row.useTransaction(this.trx)
    return row.merge(body, true).save()
  }

  merge(row: InstanceType<T>, body: Partial<ModelAttributes<InstanceType<T>>>) {
    return row.merge(body, true)
  }

  save(row: InstanceType<T>) {
    this.trx && row.useTransaction(this.trx)
    return row.save()
  }

  create(body: Partial<ModelAttributes<InstanceType<T>>>, options?: ModelAssignOptions) {
    return this.staticSourceModel.create(body, options)
  }
  createMany(body: Partial<ModelAttributes<InstanceType<T>>>[], options?: ModelAssignOptions) {
    return this.staticSourceModel.createMany(body, options)
  }

  private trx: TransactionClientContract

  useTransaction(trx: TransactionClientContract) {
    this.trx = trx
    return this
  }

  delete(value: number | string): Promise<number[]>
  delete(values: Array<number | string>): Promise<number[]>
  async delete(...args) {
    const query = this.query()
    this.trx && query.useTransaction(this.trx)
    if (['number', 'string'].includes(typeof args[0])) {
      query.where('id', args[0])
    } else if (args[0].constructor == Array) {
      query.whereIn('id', args[0])
    }
    return query.delete()
  }

  deleteBy(propKey: string, value: number | string): Promise<number[]>
  deleteBy(propKey: string, operator: string, value: number | string): Promise<number[]>
  deleteBy(propKey: string, values: Array<number | string>): Promise<number[]>
  deleteBy(where: { [m: string]: string | number | Array<string | number> }): Promise<number[]>
  deleteBy(...args) {
    const query = this.query()
    this.trx && query.useTransaction(this.trx)
    if (typeof args[0] == 'string' && ['number', 'string'].includes(typeof args[0])) {
      query.where(args[0], args[1])
    } else if (typeof args[0] == 'string' && args.length == 3) {
      query.where(args[0], args[1], args[2])
    } else if (typeof args[0] == 'string' && args[1].constructor == Array) {
      query.whereIn(args[0], args[1])
    } else {
      Object.keys(args[0]).forEach((key) => {
        if (['number', 'string'].includes(typeof args[0][key])) {
          query.where(key, args[0][key])
        } else {
          query.whereIn(key, args[0][key])
        }
      })
    }
    return query.delete()
  }
}
