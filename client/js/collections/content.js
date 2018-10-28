Content = new Mongo.Collection(null)
Promoted = new Mongo.Collection(null)

Content.getContentByBlog = function (name, limit, cb) {
  Content.remove({ type: 'blog' })
  var query = {
    tag: name,
    limit: limit
  };
  steem.api.getDiscussionsByBlog(query, function (error, result) {
    if (!result)
      return cb(error)
    else {
      for (var i = 0; i < result.length; i++) {
        try {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        result[i].surl = Content.CreateUrl(result[i].author, result[i].permlink)
        if (!result[i].json_metadata.app.includes('ongame'))
          AddOnGameElements(result[i], 'blog')
      }
    }
  })
}

Content.getContentByTrending = function (tag, limit, type, cb) {
  var query = {
    tag: tag,
    limit: limit
  };
  steem.api.getDiscussionsByTrending(query, function (error, result) {
    if (!result)
      return cb(error)
    else {
      for (var i = 0; i < result.length; i++) {
        try {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        AddOnGameElements(result[i], type)
        cb(null)
      }
    }
  })
}

Content.getContentByCreated = function (tag, limit, type, cb) {
  var query = {
    tag: tag,
    limit: limit
  };
  steem.api.getDiscussionsByCreated(query, function (error, result) {
    if (!result)
      return cb(error)
    else {
      for (var i = 0; i < result.length; i++) {
        try {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        AddOnGameElements(result[i], type)
        cb(null)
      }
    }
  })
}

AddOnGameElements = function (content, type) {
  content.type = type
  if (content.json_metadata.app != null && content.json_metadata.app.includes('dtube')) {
    content.type = "video"
  }
  if (content.json_metadata.app != null && content.json_metadata.app.includes('vimm.tv')) {
    content.type = "live"
  }
  content._id = content.id
  content.surl = Content.CreateUrl(content.author, content.permlink)
  Content.upsert({ _id: content._id }, content)
}


Content.getContent = function (author, permlink, cb) {
  steem.api.getContent(author, permlink, function (error, result) {
    if (!result)
      return cb(true)
    else {
      if (result.json_metadata) {
        try {
          result.json_metadata = JSON.parse(result.json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        if (Content.findOne({ permlink: result.permlink }))
          result.type = Content.findOne({ permlink: result.permlink })[0].type
        else
          result.type = "promoted"
        result._id = result.id
        CurrentGame.remove({})
        for (i = 0; i < result.json_metadata.tags.length; i++) {
          var tag = result.json_metadata.tags[i]
          if(tag.includes('ongame-'))
          {
            var appid = tag.split('-')[1]
            steam.getGameNews(appid)
            steam.getGameDetails(appid)
          }
        }
        result.surl = Content.CreateUrl(result.author, result.permlink)
        Content.upsert({ _id: result._id }, result)
      }
    }
    cb(null)
  });
}

Content.chainLoad = function () {
  if (Session.get('customtags')) {
    var tags = Session.get('customtags')
    for (i = 0; i < tags.length; i++) {
      if (tags[i].category != "home") {
        Content.getCreatedContent(tags[i].category, 15, 'featured', function (error) {
          if (error) {
            console.log(error)
          }
        })
        if (tags[i].subcategories) {
          for (s = 0; s < tags[i].subcategories.length; s++) {
            Content.getCreatedContent(tags[i].subcategories[s], 15, 'featured', function (error) {
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


Content.CreateUrl = function (author, permlink) {
  var url = ""
  url = "#!/@" + author + "/" + permlink
  return url
}
