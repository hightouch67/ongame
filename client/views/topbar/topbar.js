Template.topbar.events({
  'click #login': function (event) {
    event.preventDefault()
    window.location.href = sc2.getLoginURL()
  },
  'click #logout': function (event) {
    event.preventDefault()
    MainUser.remove({})
    localStorage.removeItem('username')
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('expireat')
  }
})


Template.topbar.rendered = function () {

}

// Template.topbar.events({
//   'click .toogle.sidebar.item': function (event) {
//     $('.ui.sidebar.left').sidebar('setting', 'closable', false).sidebar('setting', 'transition', 'overlay')
//     .sidebar('toggle')
//     },
// })

$(document).ready(function() {
  $('.ui.search')
  .search({
    source: Session.get('games'),
    searchFields: ['name'],
    maxResults:10,
    fullTextSearch: 'exact',
    fields: {
      title: 'name',
    },
    onSelect: function (result, response) {
      event.preventDefault()
      event.stopPropagation()
      Session.set('currentGame', result.name)
      FlowRouter.go('/game-' + result.appid)
    }
  })
  $('.ui.sidebar.left').sidebar('setting', 'closable', false).sidebar('setting', 'transition', 'overlay').sidebar('toggle')
  function toggleSidebar() {
    $(".sidebarbutton").toggleClass("active");
    $('.ui.sidebar.left').sidebar('setting', 'closable', false).sidebar('setting', 'transition', 'overlay').sidebar('toggle')
    $(".sidebar-item").toggleClass("active");
  }

  $(".sidebarbutton").on("click tap", function() {
    toggleSidebar();
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      toggleSidebar();
    }
  });

});