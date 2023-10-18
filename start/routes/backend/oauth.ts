import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get(':provider', 'OAuthsController.login')
      Route.get(':provider/callback', 'OAuthsController.callback')
    }).prefix('oauth')
  }).middleware('apiFacade')
})
  .prefix('backend')
  .namespace('App/Controllers/Http')
