/**
 * Created by Kenta Iwasaki on 10/22/2016.
 */

import {Link} from "react-router";
import "../tile.css";
import "../flex.css";
import "./MusicTrack/MusicTrack";
import request from "browser-request";

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

Music({
    tracks: [],
    profile: null,
    created() {
        let urls = {
            hip_hop: "https://soundcloud.com/alltrapnation",
            rock: "https://soundcloud.com/killrockstars",
            classical: "https://soundcloud.com/classicalkingfm"
        };
        let self = this;

        request.get({
            url: "http://watson-seamless.herokuapp.com/realDonaldTrump", json: true
        }, (req, res, data) => {
            self.profile(data);

            let max = "";
            for (var key in data.ranks_music) {
                if (data.ranks_music[key] == 1) {
                    max = key;
                    break;
                }
            }

            SC.resolve(urls[max]).then(data => {
                return data.id
            }).then(id => {
                return SC.get(`/users/${id}/tracks`);
            }).then(tracks => {
                tracks.forEach(track => {
                    self.tracks().push({
                        id: track.id,
                        title: track.title,
                        artwork: track.artwork_url,
                        stream: track.stream_url + "?client_id=2b7b69947b17fa8e085f79616c35dafc"
                    })
                })
            })
        })


    },
    destroyed() {
    },
    rendered() {
        $.StartScreen = function () {
            var plugin = this;
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

            plugin.init = function () {
                setTilesAreaSize();
                if (width > 640) addMouseWheel();
            };

            var setTilesAreaSize = function () {
                var groups = $(".tile-group");
                var tileAreaWidth = 80;
                $.each(groups, function (i, t) {
                    if (width <= 640) {
                        tileAreaWidth = width;
                    } else {
                        tileAreaWidth += $(t).outerWidth() + 80;
                    }
                });
                $(".tile-area").css({
                    width: tileAreaWidth
                });
            };

            var addMouseWheel = function () {
                $("body").mousewheel(function (event, delta, deltaX, deltaY) {
                    var page = $(document);
                    var scroll_value = delta * 50;
                    page.scrollLeft(page.scrollLeft() - scroll_value);
                    return false;
                });
            };

            plugin.init();
        }

        $.StartScreen();

        this.initTiles();

        $("body").children().children().css("height", "100%");

        setTimeout(() => {
            $.Notify({
                caption: 'Lunch',
                content: '<p style="font-size: 24px;">Jainam, your vegetarian meal will be served in 10 minutes!</p>',
                icon: "<span class='mif-vpn-publ'></span>",
                type: "warning",
                timeout: 10000
            });
        }, 6000);

        setTimeout(() => {
            $.Notify({
                caption: 'Music',
                content: `<p style="font-size: 24px;">You're now listening to: The Lifted - Mr. Sandman (ft. Ashliann)</p>`,
                icon: "<span class='mif-vpn-publ'></span>",
                type: "info",
                timeout: 5000
            });
        }, 2000);

    },
    initTiles() {
        var tiles = $(".tile, .tile-small, .tile-square, .tile-wide, .tile-large, .tile-big, .tile-super");

        $.each(tiles, function () {
            var tile = $(this);
            setTimeout(function () {
                tile.css({
                    opacity: 1,
                    "-webkit-transform": "scale(1)",
                    "transform": "scale(1)",
                    "-webkit-transition": ".3s",
                    "transition": ".3s"
                });
            }, Math.floor(Math.random() * 500));
        });

        $(".tile-group").animate({
            left: 0
        });
    },
    render() {
        <div class="tile-area tile-area-scheme-dark fg-white" style="height: 100%; max-height: 100% !important;">
            <h1 class="tile-area-title"><Link to={"/"}><span class="iconic icon mif-chevron-left"/></Link> Music.</h1>
            <div class="tile-area-controls">
                <button class="image-button icon-right bg-transparent fg-white bg-grayDark bg-hover-dark no-border">
                    <span class="sub-header no-margin text-light">Kenta Iwasaki</span> <span
                    class="icon mif-user"></span></button>
                <button class="square-button bg-transparent fg-white bg-grayDark bg-hover-dark no-border"><span
                    class="mif-search"></span></button>
                <button class="square-button bg-transparent fg-white bg-grayDark bg-hover-dark no-border"><span
                    class="mif-cog"></span></button>
                <Link to={'/logout'}
                      class="square-button bg-transparent fg-white bg-grayDark bg-hover-dark no-border"><span
                    class="mif-switch"></span></Link>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">
                    <div data-role="audio" style="width: 605px;">
                        <audio id="audioPlayer">
                            <source src="http://metroui.org.ua/res/rec.mp3" type='audio/mp3'/>
                        </audio>
                    </div>
                </span>

                <div class="tile-container" style="margin-top: 32px;">
                    <div class="tile tile-big-x bg-teal fg-white">
                        <div class="tile-content">
                            <span class="tile-label" style="padding: 16px; text-align: center;">Hey Kenta! We looked through your music and thought that <b>Hip Hop</b> suits you. <br/><br/>Here's some of the latest tracks from SoundCloud :).<br/><br/></span>
                        </div>
                    </div>
                    <br/><br/><br/><br/>


                </div>
            </div>

            {
                listToMatrix(this.tracks(), 6).map((r, i) => {
                    return <div class="tile-group double" key={i}>
                        <span class="tile-group-title"></span>
                        <div class="tile-container" style="margin-top: 32px;">
                            {
                                r.map((p, n) => {
                                    return <MusicTrack {...p} key={n}/>
                                })
                            }
                        </div>
                    </div>
                })}
        </div>
    }
})
