Template.aboutgame.events({
  'click .card.screenshot': function (event) {
      event.preventDefault()
      $('.ui.screenshot.modal').remove()
      $('.ui.main.container').append(Blaze.toHTMLWithData(Template.imagemodal, {data:this}));
      $('.ui.screenshot.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
  },
})