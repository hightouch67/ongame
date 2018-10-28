Template.article.rendered = function () {
    Session.set('backgroundimage','./images/background.jpg')
}

Template.article.helpers({
    tagsArray: function (tags) {
        if(typeof tags != String)
        return true
        else return false
    },
    SelectedFaq: function () {
        if(Session.get('selectedfaq'))
        return Faq.findOne({ 'permlink': Session.get('selectedfaq') })
        else{
            return Faq.findOne({ 'json_metadata.tags': 'welcome', 'type': 'welcome' })
        }
    }
})
