var videojs = require('video.js')
var playlist = require('videojs-playlist')

Template.player.rendered = function () {
    if (this.data.video480hash != null || this.data.video480hash != undefined) {
        var player = videojs(document.querySelector('video'), {
            inactivityTimeout: 0
        });
        player.reset()
        var sources = [{ "type": "video/mp4", "src": 'https://video.dtube.top/ipfs/' + this.data.video480hash }];
        player.src(sources);
    }
    else {
        var player = videojs(document.querySelector('video'), {
            inactivityTimeout: 0
        });
        player.reset()
        var videoPlaylist = []
        for (i = 0; i < this.data.length; i++) {
            var video = {}
            var src = this.data[i].webm[480]
            var type = 'video/webm'
            var sources = []
            sources.src = src
            sources.type = type
            sources.push(src)
            sources.push(type)
            video.sources = sources
            video.poster = this.data[i].thumbnail
            videoPlaylist.push(video)
        }
        player.playlist(videoPlaylist, 0);
        player.playlist.autoadvance(0);
        player.playlist.repeat(true);
        if (videoPlaylist.length > 1) {

            player.on( 'ended', function() {
                if ( size == (player.playlist.currentItem() + 1)){
                    player.playlist(videoPlaylist, 0);
                }
            });

            Array.prototype.forEach.call(document.querySelectorAll('[name=autoadvance]'), function (el) {
                el.addEventListener('click', function () {
                    var value = document.querySelector('[name=autoadvance]:checked').value;
                    player.playlist.autoadvance(JSON.parse(value));
                });
            });
            var Button = videojs.getComponent('Button');
            var PrevButton = videojs.extend(Button, {
                constructor: function () {
                    Button.apply(this, arguments);
                    this.addClass('angle left icon');
                    this.controlText("Previous");
                },
                constructor: function () {
                    Button.apply(this, arguments);
                    this.addClass('vjs-play-control', 'vjs-control', 'vjs-button', 'vjs-paused');
                },
                createEl: function () {
                    return Button.prototype.createEl('button', {
                        className: 'vjs-previous-button vjs-control vjs-button',
                        innerHTML: '<i class="angle left icon"></i>'
                    });
                },
                handleClick: function () {
                    player.playlist.previous();
                }
            });

            var Button = videojs.getComponent('Button');
            var NextButton = videojs.extend(Button, {
                constructor: function () {
                    Button.apply(this, arguments);
                    this.addClass('angle right icon');
                    this.controlText("Next");
                },

                constructor: function () {
                    Button.apply(this, arguments);
                    this.addClass('vjs-play-control', 'vjs-control', 'vjs-button', 'vjs-paused');
                },

                createEl: function () {
                    return Button.prototype.createEl('button', {
                        className: 'vjs-next-button vjs-control vjs-button',
                        innerHTML: '<i class="angle right icon"></i>'
                    });
                },

                handleClick: function () {
                    player.playlist.next();
                }
            });

            videojs.registerComponent('NextButton', NextButton);
            videojs.registerComponent('PrevButton', PrevButton);
            player.getChild('controlBar').addChild('PrevButton', {}, 0);
            player.getChild('controlBar').addChild('NextButton', {}, 2);
            player.playlist.first()
        }
    }
    try {
        player.volume(1);
    } catch (e) { }
}
