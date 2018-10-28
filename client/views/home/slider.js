var carousel = require('owl.carousel')

Template.slider.rendered = function () {
  $( document ).ready(function() {
    Template.slider.createSlider();
    $('.image.lazy img')
    .visibility({
      type       : 'image',
      transition : 'fade in',
      duration   : 1000
    })
  })
  $(window).resize(function () {
    $('.slider.owl-carousel').owlCarousel('destroy')
    Template.slider.createSlider();
  });

}

Template.slider.createSlider = function () {
  $(".slider.owl-carousel").owlCarousel({
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