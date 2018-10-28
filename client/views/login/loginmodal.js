Template.loginmodal.events({

})


Template.loginmodal.events({

})



Template.loginmodal.rendered = function () {

}


Template.loginmodal.init = function () {
    document.getElementById("steemconnect").addEventListener("click", loginWithSteemConnect);

}

function loginWithSteemConnect() {
    sessionStorage.setItem('currentroute', FlowRouter.current().path)
    window.location.href = sc2.getLoginURL()
}