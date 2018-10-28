var carousel = require('owl.carousel')

Template.cardslider.rendered = function () {
  var random = Template.cardslider.createPermlink(10)
  this.firstNode.id = random
  Template.cardslider.createSlider(random)
  $('.image.lazy img')
  .visibility({
    type       : 'image',
    transition : 'fade in',
    duration   : 1000
  })
}

Template.cardslider.createSlider = function (elemId) {
    $("#" + elemId).owlCarousel({
      loop: true,
      margin: 20,
      autoplay:true,
      autoplayTimeout:10000,
      responsiveBaseElement: document.getElementsByClassName('ui container'),
      nav: true,
      navText: ["<i class='chevron left icon semanticui-nextprev-icon'></i>","<i class='chevron right icon semanticui-nextprev-icon'></i>"],
      dots: false,
      lazyLoad: true,
      responsiveClass: true,
      responsive: {
         211: {
           items: 1,
           slideBy: 1,
           nav: false
         },
        399: {
           items: 2,
           slideBy: 2,
          nav: false
         },
         642: {
          items: 3,
          slideBy: 2,
         nav: true
        },
        854: {
          items: 4,
          slideBy: 1,
          nav: true
        },
        1060: {
          items: 4,
          slideBy: 1,
          nav: true,
          loop: true
        },
        1272: {
          items: 4,
          slideBy: 1,
          nav: true,
          loop: true
        },
        1484: {
          items: 7,
          slideBy: 5,
          nav: true,
          loop: true
        }
      }
    })
}

Template.cardslider.refreshSlider = function () {
  window.dispatchEvent(new Event('resize'))
}

Template.cardslider.createPermlink = function (length) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }