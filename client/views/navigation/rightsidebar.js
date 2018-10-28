Template.rightsidebar.events({
  'click #login': function (event) {
    $('.ui.login.modal').remove()
    $('article').append(Blaze.toHTMLWithData(Template.loginmodal, { data: this }));
    $('.ui.login.modal').modal('setting', 'transition', 'scale').modal('show')
    Template.loginmodal.init()
  },
  'click #logout': function (event) {
    event.preventDefault()
    MainUser.remove({})
    localStorage.removeItem('username')
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('expireat')
  }
})

Template.rightsidebar.onRendered(function () {
  $( window ).on( "load", function() {
    $('.ui.dropdown.profile')
      .dropdown()
  })
})

