import { Template } from "meteor/templating";
import { Session } from "meteor/session";

function refreshMainUser() {
  if (localStorage.username) {
    MainUser.add(localStorage.username, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
  return
}

var ticker;

FlowRouter.route('/', {
  name: 'home',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "home", nav: "nav" });
  }
});

FlowRouter.route('/games', {
  name: 'games',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "games", nav: "nav" });
  }
});

FlowRouter.route('/livestreams', {
  name: 'livestreams',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "livestreams", nav: "nav" });
  }
});

FlowRouter.route('/videos', {
  name: 'videos',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "videos", nav: "nav" });
  }
});

FlowRouter.route('/team', {
  name: 'team',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "team", nav: "nav" });
  }
});

FlowRouter.route('/tournament', {
  name: 'tournament',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "tournament", nav: "nav" });
  }
});


FlowRouter.route('/@:user', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'overview')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/blog', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'blog')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/friends', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'friends')
    loadUser(params.user)
    steam.getUserFriendsDetails(User.findOne({}).stream_id)
    Followers.loadFollowers(params.user, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
})

FlowRouter.route('/@:user/rewards', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'rewards')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/wallet', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'wallet')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/comments', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'comments')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/replies', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'replies')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/achievements', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'achievements')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/statistics', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'statistics')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/:permlink', {
  name: 'project',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "article", nav: "nav" });
    Session.set('user', params.user)
    Session.set('article', params.permlink)
    CurrentGame.remove({})
    if (!Content.findOne({ permlink: params.permlink })) {
      Content.getContent(params.user, params.permlink, function (error) {
        if (error) {
          console.log(error)
        }
      })
    }
    if (!Comments.findOne({ permlink: params.permlink })) {
      Comments.loadComments(params.user, params.permlink, function (error) {
        if (error) {
          console.log(error)
        }
      })
    }
    Content.getContentByBlog(params.user, 30, function (error) {
      if (error) {
        console.log(error)
      }
    })
    User.add(params.user, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
})

FlowRouter.route('/game-:id', {
  name: 'singlegame',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "singlegame", nav: "nav" });
    CurrentGame.remove({})
    Games.remove({})
    steam.getGameNews(params.id)
    steam.getGameDetails(params.id)
    Content.remove({ type: 'gamenews' })
    if (Session.get('games'))
      var game = Session.get('games').find(function (element) {
        return element.appid > params.id - 1;
      });
    //steam.getGameDetails(game.appid)
    // if (params.id = 578080) {
    //   Content.getContentByTrending("pubg", 20, 'gamenews', function (error) {
    //     if (error)
    //       console.log(error)
    //   })
    // }
    // if (params.id === "fortnite") {
    //   Content.getContentByTrending("fortnite", 20, 'gamenews', function (error) {
    //     if (error)
    //       console.log(error)
    //   })
    // }
    // else {
    //   Content.getContentByTrending(game.name, 10, 'gamenews', function (error) {
    //     if (error)
    //       console.log(error)
    //   })
    // }
  }
})

FlowRouter.route('/sc2login', {
  name: 'sc2login',
  action: function (params, queryParams) {
    console.log(queryParams)
    localStorage.clear();
    localStorage.setItem('accesstoken', queryParams.access_token)
    localStorage.setItem('expireat', queryParams.expires_in)
    localStorage.setItem('username', queryParams.username)
    var time = new Date();
    FlowRouter.setQueryParams({ params: null, queryParams: null });
    time = new Date(time.getTime() + 1000 * (localStorage.expireat - 10000));
    localStorage.setItem('expirein', time)
    FlowRouter.go('/')
    refreshMainUser()
  }
});

FlowRouter.route('/twitchlogin/:params', {
  name: 'twitchlogin',
  action: function (params, queryParams) {
    token = document.location.hash.split('access_token=')[1].split('&')[0]
    twitch.verifyUser(token, function (result) {
      if (result) {
        twitch.addTwitchUser(result.user_id)
      }
    })
    FlowRouter.go('/')
  }
});

FlowRouter.route('/twitchlogin:params', {
  name: 'twitchlogin',
  action: function (params, queryParams) {
    token = document.location.hash.split('access_token=')[1].split('&')[0]
    twitch.verifyUser(token, function (result) {
      if (result) {
        twitch.addTwitchUser(result.user_id)
      }
    })
    FlowRouter.go('/')
  }
});

FlowRouter.route('/steamlogin/:id', {
  name: 'steamlogin',
  action: function (params, queryParams) {
    token = document.location.hash.split('id=')[1]
    steam.addSteamUser(token)
    FlowRouter.go('/')
  }
});

FlowRouter.route('/livelogin:id', {
  name: 'livelogin',
  action: function (params, queryParams) {
    console.log(document.location.hash)
    console.log(window.location.href)
    // token = document.location.hash.split('id=')[1]
    // steam.addSteamUser(token)
    FlowRouter.go('/')
  }
});

FlowRouter.route('/livelogin/:id', {
  name: 'livelogin',
  action: function (params, queryParams) {
    console.log(document.location.hash)
    console.log(window.location.href)
    // token = document.location.hash.split('id=')[1]
    // steam.addSteamUser(token)
    FlowRouter.go('/')
  }
});


function loadUser(user) {
  if (!PersonalHistory.findOne({ username: user }))
    PersonalHistory.getPersonalHistory(user, 4000, function (error) {
      if (error) {
        console.log(error)
      }
    })
  if (!Content.findOne({ author: user }))
    Content.getContentByBlog(user, 30, function (error) {
      if (error) {
        console.log(error)
      }
    })
  if (!User.findOne({ name: user }))
    User.add(user, function (error) {
      if (error) {
        console.log(error)
      }
    })
    vimm.getUserInfo(user)
}