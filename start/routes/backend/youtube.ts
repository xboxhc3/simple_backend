import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get('shorts', 'YoutubesController.shorts')
      Route.get('shorts/:channelId', 'YoutubesController.shorts')
    }).prefix('youtube')
  }).middleware('apiFacade')
})
  .prefix('backend')
  .namespace('App/Controllers/Http')
