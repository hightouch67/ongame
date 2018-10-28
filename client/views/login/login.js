


Template.login.helpers({
    loginUrl: function () {
        return sc2.getLoginURL()
    }
})

Template.login.rendered = function () {
    $('.ui.embed.login').embed('autoplay',true)
    var em = $('.ui.embed.login')
}