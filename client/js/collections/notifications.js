Notifications = new Mongo.Collection(null)
// notificationsObserver = new PersistentMinimongo2(Notifications, 'notifications');
var moment = require('moment')

Notifications.ws = new WebSocket('wss://api.busy.org/')

Notifications.ws.onmessage = function (event) {
  var data = JSON.parse(event.data)
  if (data && data.result && data.result.length > 0) {
    for (let i = 0; i < data.result.length; i++)
      if (!Notifications.findOne(data.result[i])) {
        var notif = data.result[i]
        switch (notif.type) {
          case 'transfer':
            Notifications.insert(notif)
            break;
          default:
            break;
        }
      }
  }
  else {

  }
}

Notifications.Start = function (name) {
  if (Notifications.ws.readyState != 1)
    Notifications.ws.onopen = function () {
      Notifications.ws.send(JSON.stringify({ method: 'get_notifications', params: [name] }))
      Notifications.ws.send(JSON.stringify({ method: 'subscribe', params: [name] }))
    }
  else {
    Notifications.ws.send(JSON.stringify({ method: 'get_notifications', params: [name] }))
    Notifications.ws.send(JSON.stringify({ method: 'subscribe', params: [name] }))
  }

}
