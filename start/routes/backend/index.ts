import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('greeting', 'UserController.greeting')
    Route.post('signUp', 'UserController.signUp')

    Route.group(() => {}).middleware(['auth'])
  }).middleware('apiFacade')
})
  .prefix('backend')
  .namespace('App/Controllers/Http')

require('./oauth')
require('./youtube')
