Template.wallet.events({
  'click .transfer': function (event) {
      event.preventDefault()
      event.stopPropagation();
      $('.ui.transfer.modal').remove()
      $('article').append(Blaze.toHTMLWithData(Template.transfermodal, {data:this}));
      $('.ui.transfer.modal').modal('setting', 'transition', 'scale').modal('show')
      Template.transfermodal.init()
  },
})