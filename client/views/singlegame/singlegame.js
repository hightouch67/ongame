Template.singlegame.rendered = function () {
    $('.menu.game .item')
    .tab()
}

Template.singlegame.onRendered(function () {
    window.addEventListener("load", function () {
        $('.menu.game .item')
        .tab()
    }, false);
})

Template.singlegame.InitTab = function(){
    $('.menu.game .item')
    .tab()
}