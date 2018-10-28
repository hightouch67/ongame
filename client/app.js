import './buffer';
import './main.html';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { WebApp } from 'meteor/webapp';
import steem from 'steem';
import sc2sdk from 'sc2-sdk';



FlowRouter.wait();
FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render('mainlayout', { top: "topbar", main: "home", nav: "nav" });
    }
};

steem.api.setOptions({ url: 'https://api.steemit.com' });
window.steem = steem;

// Deps.autorun(function () {
//     $(window).scrollTop(0);
// });

// window.loadLangAuto(function (error) {
//     if (error)
//         loadDefaultLang()
// })

BlazeLayout.setRoot('body');
Meteor.startup(function () {
    var isInDev = false;
    if (isInDev) {
        console.log('DevMode')
        var sc2 = sc2sdk.Initialize({
            app: 'factit.app',
            baseURL: 'https://steemconnect.com',
            callbackURL: 'http://localhost:3000/sc2login',
            accessToken: 'access_token'
        });
    }
    else {
        var sc2 = sc2sdk.Initialize({
            app: 'ongame.app',
            baseURL: 'https://steemconnect.com',
            callbackURL: 'https://ongame.io/#!/sc2login',
            accessToken: 'access_token'
        });
        steam.applist()
        coinmarket.steemdollars()
        coinmarket.allcoins()    
        steam.getFeaturedGames()
        vimm.getLiveList()
        startload.loadFromSteem()
        twitch.getLiveList()
        twitch.getTopStream()
    }

    steem.api.getOrderBook(1, function (err, result) {
        if (!err) {
            Session.set("sbdmarketprice", Number(result.asks[0].real_price).toFixed(2));
        }
    });
    steem.api.getCurrentMedianHistoryPrice(function (error, result) {
        if (!error) {
            var sbd = result.base.split(' ')[0]
            Session.set('sbdprice', sbd)
        }
    });
    steem.api.getDynamicGlobalProperties(function (err, result) {
        if (result) {
            var receiveDate = (new Date()).getTime();
            var responseTimeMs = receiveDate - sendDate;
            console.log('Global Properties loaded in : ' + responseTimeMs + "ms")
            localStorage.setItem('steemProps', JSON.stringify(result))
        }
    })

    window.sc2 = sc2
    var sendDate = (new Date()).getTime();
    Session.set('backgroundimage','./images/background.jpg')

    if (localStorage.username) {
        MainUser.add(localStorage.username, function (error) {
            if (error) {
                console.log(error)
            }
        })
    }
    FlowRouter.initialize({ hashbang: true }, function () {
        
    });
    $(window).on('hashchange', function() {
        FlowRouter.go(window.location.hash)
      });
})

console.log(
    `%c BE CAREFULL!`,
    "background: #6b07f8; color: white; font-size: 18px; padding: 3px 3px;"
);
console.log(
    `%c THIS FEATURE IS DESIGNED FOR DEVELOPERS.`,
    "background: white; color: black; font-size: 23px; padding: 3px 3px;"
);
console.log(
    `%c You must read and understand anything you paste or type here or you could compromise your account and your private keys.`,
    "background: white; color: black; font-size: 23px; padding: 3px 3px;"
);
console.log(
    `%c More informations on : https://ongame.io`,
    "background: #6b07f8; color: white; font-size: 12px; padding: 3px 3px;"
);
console.log(
    `%c All rights : https://steemit.com/@futureshock`,
    "background: #6b07f8; color: white; font-size: 12px; padding: 3px 3px;"
);

