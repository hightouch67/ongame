Session.set('load',0)
startload = {
    loadFromSteem: function () {
        Content.getContentByCreated('gaming', 30, 'trending', function (error) {
            if (error)
                console.log(error)
                else Session.set('load',Session.get('load')+1)
        })
        Content.getContentByCreated('game', 30, 'trending', function (error) {
            if (error)
                console.log(error)
                else Session.set('load',Session.get('load')+1)
        })
        Content.getContentByCreated('vimmtv', 40, 'trending', function (error) {
            if (error)
                console.log(error)
                else Session.set('load',Session.get('load')+1)
        })
        
        Content.getContentByCreated('xbox', 10, 'xbox', function (error) {
            if (error)
                console.log(error)
                else Session.set('load',Session.get('load')+1)
        })
        Content.getContentByCreated('playstation', 10, 'psx', function (error) {
            if (error)
                console.log(error)
                else Session.set('load',Session.get('load')+1)
        })
    }

}
