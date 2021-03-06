Template.registerHelper('trendingLiveVimm', function () {
    if(Session.get('load') === 120)
    return LiveStream.find().fetch()

})

Template.registerHelper('trendingContent', function (type) {
     if(Session.get('load') === 120)
    return Content.find({type:type},
        { sort: { created: -1 }, limit: 12 }).fetch()

})

Template.registerHelper('trendingContentXbox', function (type) {
    if(Session.get('load') === 120)
    return Content.find({type:type},
        { sort: { created: -1 }, limit: 3 }).fetch()

})

Template.registerHelper('trendingContentPsx', function (type) {
    if(Session.get('load') === 120)
    return Content.find({type:type},
        { sort: { created: -1 }, limit: 3 }).fetch()

})

Template.registerHelper('trendingLive', function () {
    return Content.find({type:'live'},
        { sort: { created: -1 }, limit: 8 }).fetch()

})


Template.registerHelper('commentIsDeletable', function (comment) {
    var date = new Date();
    date.setDate(date.getDate() - 7);

    if(Comments.findOne({parent_permlink:comment.permlink}) || comment.created < date || comment.net_votes > 0 )
    return false
    else return true
})




Template.registerHelper('userLive', function () {
    return UserLive.findOne()
})

Template.registerHelper('twitchGames', function () {
    return TwitchGames.find({},{limit:18}).fetch()
})

Template.registerHelper('twitchLive', function () {
    return TwitchLive.find({},{limit:4}).fetch()
})


Template.registerHelper('trendingVideo', function () {
    if(Session.get('load') === 120)
    return Content.find({type:'video'}).fetch()
})

Template.registerHelper('featuredGames', function () {
    return FeaturedGames.find().fetch()

})

Template.registerHelper('gameNews', function () {
    return GameNews.find({},{limit:3}).fetch()
})


Template.registerHelper('currentSuggestions', function () {
    return Content.find({ type: 'blog', author: Session.get('user') },
        { sort: { created: -1 }, limit: 5 }
    ).fetch()
})

Template.registerHelper('userBlog', function () {
    return Content.find({ type: 'blog', author: Session.get('user') },
        { sort: { created: -1 }}
    ).fetch()
})

Template.registerHelper('currentGameNews', function () {
    return Content.find({type:'steemgamenews'},
        { sort: { upvoted: -1, created: -1 }, limit: 3 }).fetch()

})

Template.registerHelper('trendingGame', function () {
    return Games.find({},
        { sort: { upvoted: -1, created: -1 }, limit: 8 }).fetch()

})

Template.registerHelper('userTotalPlayedTime', function () {
    var games = UserGames.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id},
        { sort: { created: -1 }}).fetch()
        var total =0;
        for(i=0;i<games.length;i++)
        {
            total += games[i].playTime
        }
        return total
})



Template.registerHelper('userMostPlayed', function () {
    var games = UserGames.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id},
        { sort: { playTime: -1 }}).fetch()
        return games[0]
})

Template.registerHelper('userGames', function () {
    return UserGames.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id},
        { sort: { created: -1 },limit:24}).fetch()
})

Template.registerHelper('userRecentGames', function () {
    return UserRecentGames.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id},
        { sort: { created: -1 },limit:24}).fetch()
})

Template.registerHelper('currentArticle', function () {
    if (Content.findOne({ 'permlink': Session.get('article') })) {
        return Content.findOne({ 'permlink': Session.get('article') })
    }
})

Template.registerHelper('currentAuthor', function () {
    if (User.findOne({ name: Session.get('user') })) {
        return User.findOne({ name: Session.get('user') })
    }
})

Template.registerHelper('currentSingleGame', function () {
        return CurrentGame.findOne()
})

Template.registerHelper('userTotalFriends', function (int) {
    return Number(int) + Number(Friends.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id}).fetch().length)
})

Template.registerHelper('currentAuthorFollowers', function () {
        return Followers.find({following:Session.get('user')},{limit:30}).fetch()
})

Template.registerHelper('userFriends', function () {
    return Friends.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id},{limit:30}).fetch()
})

Template.registerHelper('userTotalSteamFriends', function () {
    return Friends.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id}).fetch().length
})

Template.registerHelper('userAchievements', function (appID) {
    return Achievements.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id,appID:appID},{limit:10}).fetch()
})

Template.registerHelper('userAllAchievements', function () {
    return Achievements.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id}).fetch().length
})

Template.registerHelper('userAchievementsTotal', function (appID) {
    return Achievements.find({steam_id:User.findOne({ name:  Session.get('user')}).steam_id,appID:appID}).fetch().length
})

Template.registerHelper('gameFromAppid', function (appID) {
    return UserGames.findOne({steam_id:User.findOne({ name:  Session.get('user')}).steam_id,appID:appID})
})

Template.registerHelper('currentAuthorHistory', function (type) {
            return PersonalHistory.find({type:type,username:Session.get('user')}, { sort: { date: -1 }, limit: 4 }).fetch()
})

Template.registerHelper('currentAuthorHistoryLast', function () {
        var total = PersonalHistory.find({username:Session.get('user')}, { sort: { date: -1 }}).fetch().length
        if(PersonalHistory.find({username:Session.get('user')}, { sort: { date: -1 }}).fetch()[total-1])
        return PersonalHistory.find({username:Session.get('user')}, { sort: { date: -1 }}).fetch()[total-1].date
})

Template.registerHelper('userRewards', function () {
    var history = PersonalHistory.find({}, { sort: { date: -1 }}).fetch()
    var array = []
    var reward_sbd = 0
    var reward_steem = 0
    var reward_vests = 0
    for(i=0;i<history.length;i++)
    {
        if(history[i].type === 'claimreward')
        {
            var sbd = Number(parseFloat(history[i].reward_sbd.split(' ')[0]).toFixed(3))
            if(sbd >0)
            reward_sbd = reward_sbd + sbd
            var steem = Number(parseFloat(history[i].reward_steem.split(' ')[0]).toFixed(3))
            if(steem >0)
            reward_steem = reward_steem + steem
            var vests = vestToSteemPower(history[i].reward_vests.split(' ')[0])
            if(vests >0)
            reward_vests = reward_vests + vests
        }
    }
    array.push(reward_sbd,reward_steem,reward_vests)

    return array
})

function vestToSteemPower(userVests) {
    userVests = Number(userVests)
    if (JSON.parse(localStorage.steemProps) && userVests) {
        var globals = JSON.parse(localStorage.steemProps)
        var totalSteem = parseFloat(globals.total_vesting_fund_steem.split(' ')[0])
        var totalVests = parseFloat(globals.total_vesting_shares.split(' ')[0])
        var SP = totalSteem * (userVests / totalVests)
        return Number(parseFloat(SP).toFixed(3))
    }
}


Template.registerHelper('totalRewardValue', function (array) {  
    var totalUSD = 0
    totalUSD = totalUSD + Number(array[0] * Coins.findOne({ 'id': 'steem-dollars' }).price_usd)
    totalUSD = totalUSD + Number(array[1] * Coins.findOne({ 'id': 'steem' }).price_usd)
    totalUSD = totalUSD + Number(array[2] * Coins.findOne({ 'id': 'steem' }).price_usd)
    return parseFloat(totalUSD).toFixed(3)
})

Template.registerHelper('currentArticleComments', function () {
    if (Comments.find({ 'parent_permlink': Session.get('article') }).fetch()) {
        return Comments.find({ 'parent_permlink': Session.get('article') }).fetch()
    }
})

Template.registerHelper('currentCommentsSubcomments', function (comment) {
    if (Comments.find({ 'parent_permlink': comment.permlink }).fetch()) {
        return Comments.find({ 'parent_permlink': comment.permlink }).fetch()
    }
})

Template.registerHelper('filterTags', function (tag) {
    var banlist = ['game','gaming','games','dtube','vimmtv','youtube','video','live','videogames','videogame','steem','witness']
    if (banlist.includes(tag))
    return false
    else return true
})

Template.registerHelper('filterCategories', function (tag) {
    var banlist = ['Steam','Downloadable','Partial']
    for (i=0;i<banlist.length;i++)
    {
        if(tag.includes(banlist[i]))
        return false
    }
    return true
})
