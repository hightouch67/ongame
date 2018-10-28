var carousel = require('owl.carousel')

Template.videoslider.rendered = function () {
  $( document ).ready(function() {
    Template.videoslider.createSlider();
    $('.image.lazy img')
    .visibility({
      type       : 'image',
      transition : 'fade in',
      duration   : 1000
    })
  })
  $(window).resize(function () {
    $('.videoslider.owl-carousel').owlCarousel('destroy')
    Template.videoslider.createSlider();
  });
  
}

Template.videoslider.createSlider = function () {
  $(".videoslider.owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 10000,
    nav: true,
    navText: ["<i class='chevron left icon semanticui-nextprev-icon'></i>", "<i class='chevron right icon semanticui-nextprev-icon'></i>"],
    dots: false,
    items:4
  })
}