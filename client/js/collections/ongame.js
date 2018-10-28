
Games = new Mongo.Collection(null)
CurrentGame = new Mongo.Collection(null)
FeaturedGames= new Mongo.Collection(null)
GameNews = new Mongo.Collection(null)

ongame={
    getUser: function(user,cb) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/getlinks/' + user, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        var res = JSON.parse(xtr.responseText)
                            cb(res[0])
                    }
                 }
            }
            else cb(false)
        }
    }
}

