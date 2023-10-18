import { validate, schema, rules } from '@ioc:Adonis/ClassValidator'
import { CommonCodes } from 'App/Constants/ApiCode/CommonCodes'
import { User1000 } from 'App/Constants/ApiCode/User1000'

export class SignUpValidator {
  @validate(schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]), {
    string: User1000.EMAIL_ERROR.toString(),
    required: User1000.EMAIL_ERROR.toString(),
    email: User1000.EMAIL_ERROR.toString(),
    unique: User1000.EMAIL_DUPLICATE.toString(),
  })
  public email: string

  @validate(
    schema.string({}, [
      rules.minLength(8),
      rules.regex(/[0-9]/),
      rules.regex(/[a-z]/),
      rules.regex(/[A-Z]/),
      rules.regex(/[!@#\$%\^\&*\)\(+=._-]/),
      rules.confirmed('password_confirm'),
    ]),
    {
      string: User1000.PASSWORD_POLICY_ERROR.toString(),
      required: User1000.PASSWORD_POLICY_ERROR.toString(),
      minLength: User1000.PASSWORD_POLICY_ERROR.toString(),
      regex: User1000.PASSWORD_POLICY_ERROR.toString(),
    }
  )
  public password: string

  @validate(schema.string(), {
    string: User1000.PASSWORD_CONFIRM_NOT_MATCH.toString(),
    required: User1000.PASSWORD_CONFIRM_NOT_MATCH.toString(),
    confirmed: User1000.PASSWORD_CONFIRM_NOT_MATCH.toString(),
  })
  public password_confirm: string

  @validate(schema.string.optional(), {
    string: CommonCodes.TYPE_ERROR.toString(),
  })
  public name: string
}
