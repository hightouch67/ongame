const SteamAPI = require('steamapi');
const steamapi = new SteamAPI('CEC36B9FA6B14A871D4A02DE102486DA');

steam = {
    applist: function () {
        CreateUrl = function (id) {
            var url = ""
            url = "/#!/#game/" + id + "/"
            return url
        }
        steamapi.getAppList().then(result => {
            Session.set('games', result)
        }).catch(error => {
            // console.error( 'fonction siRompue appelée : ' + raison );
        });
    },
    getGameNews: function (appID) {
        steamapi.getGameNews(appID).then(result => {
            GameNews.remove({})
            for (var i = 0; i < result.length; i++) {
                GameNews.upsert({ _id: result[i]._id }, result[i]);
            }
        }).catch(error => {
            // console.error( 'error : ' + raison );
        });

    },
    getUserGames: function (steam_id) {
        steamapi.getUserOwnedGames(steam_id).then(result => {
            UserGames.remove({})
            for (var i = 0; i < result.length; i++) {
                result[i].steam_id = steam_id
                if (result[i].appID != 205790)
                    UserGames.upsert({ _id: result[i]._id }, result[i]);
            }
        }).catch(error => {
            // console.error( 'error : ' + raison );
        });

    },
    getFeaturedGames: function () {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://steamcors.herokuapp.com/http://store.steampowered.com/api/featured/');
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.onload = function () {
            console.log(result)
            var result =  JSON.parse(x.responseText)
            for (var i = 0; i < result.featured_linux.length; i++) {
                FeaturedGames.upsert({ _id: result.featured_linux[i]._id }, result.featured_linux[i]);
            }
            for (var i = 0; i < result.featured_mac.length; i++) {
                FeaturedGames.upsert({ _id: result.featured_mac[i]._id }, result.featured_mac[i]);
            }
            for (var i = 0; i < result.featured_win.length; i++) {
                FeaturedGames.upsert({ _id: result.featured_win[i]._id }, result.featured_win[i]);
            }
        };
        x.send();
    },
    getUserRecentGames: function (steam_id) {
        steamapi.getUserRecentGames(steam_id).then(result => {
            for (var i = 0; i < result.length; i++) {
                result[i].steam_id = steam_id
                UserRecentGames.upsert({ _id: result[i]._id }, result[i]);
            }
        }).catch(error => {
            // console.error( 'error : ' + raison );
        });

    },
    getUserBadges(steam_id) {
        steamapi.getUserBadges(steam_id).then(result => {
            console.log(result)
        }).catch(error => {
            // console.error( 'error : ' + raison );
        });
    },
    getPlayerLevel: function (steam_id) {
        var player = new SteamApi.Player(STEAM_API_KEY, steam_id);
        player.GetSteamLevel(steam_id).done(function (result) {
            console.log(result);
        });
    },
    getPlayerSummary: function (steam_id, cb) {
        steamapi.getUserSummary(steam_id).then(result => {
            cb(result);
        }).catch(error => {
            cb(null)
        });
    },
    getUserAchievements: function (steam_id, appID) {
        steamapi.getUserAchievements(steam_id, appID).then(result => {
            if (result) {
                const achievements = result.achievements
                $.each(achievements, function (i, item) {
                    item.appID = appID
                    item.steam_id = steam_id
                    Achievements.upsert({ _id: item._id }, item);
                });
            }
        }).catch(error => {
        });
    },
    getUserFriends: function (steam_id) {
        steamapi.getUserFriends(steam_id).then(result => {
            if (result) {
                $.each(result, function (i, item) {
                    item.steam_id = steam_id
                    Friends.upsert({ _id: item._id }, item);
                });
            }
        }).catch(error => {
        });
    },
    getUserFriendsDetails: function (steam_id) {
        steamapi.getUserFriends(steam_id).then(result => {
            if (result) {
                Friens.remove({})
                $.each(result, function (i, item) {
                    item.steam_id = steam_id
                    steam.getPlayerSummary(item.steamID, function (cb) {
                        if (cb) {
                            item.profile = cb
                            Friends.upsert({ _id: item._id }, item);
                        }
                    })
                });
            }
        }).catch(error => {
        });
    },
    getGameDetails: function (appID) {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://steamcors.herokuapp.com/http://store.steampowered.com/api/appdetails?appids='+appID);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.onload = function () {
            CurrentGame.remove({})
            var result =  JSON.parse(x.responseText)
            result = result[appID].data
            if(result.background)
            Session.set('backgroundimage',result.background)
            else Session.set('backgroundimage',result.header_image)
            $('.main.background').css( "background-image",'url('+Session.get('backgroundimage')+')');
            Content.remove({type:'steemgamenews'})
            Content.getContentByCreated(result.name,20,'steemgamenews',function(error){
                if(error)
                console.log(error)
            })
            
            CurrentGame.upsert({ _id: result._id }, result);
        };
        x.send();
    },
    addSteamUser: function (id) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/link/' + localStorage.username + "/steam_id/" + id, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        MainUser.add(localStorage.username, function (error) {
                            if (error) {
                                console.log(error)
                            }
                        })
                    }
                }
            }
        }
    }
}

