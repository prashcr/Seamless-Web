/**
 * Created by Kenta Iwasaki on 10/22/2016.
 */

import {Link} from "react-router";
import request from "browser-request";
import async from "async";
import c3 from "c3";
import "../../node_modules/c3/c3.css";
import "../tile.css";
import "../flex.css";

function now_x(min, before_hours) {
    Date.prototype.addMinutes = function (h) {
        this.setTime(this.getTime() + (h * 60 * 1000));
        return this;
    };
    return new Date().addMinutes((8 - before_hours) * 60 + min).toISOString().replace(/\..+/, '') + '+08:00';
}

let data = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

function callRequests(counter, callback) {
    let before_hours = counter;

    let now = now_x(0, before_hours);

    let now_05 = now_x(30, before_hours);
    let now_2 = now_x(120, before_hours);

    let now_05b = now_x(-30, before_hours);
    let now_2b = now_x(-120, before_hours);

    let dep_query = '/api/v0/schedule/records?limit=1000000&scheduledDatetimeLocalMin=' + now_05 +
        '&scheduledDatetimeLocalMax=' + now_2 + '&arrivalDeparture=D';

    let arr_num = 0;
    let arr_query = '/api/v0/schedule/records?limit=1000000&scheduledDatetimeLocalMin=' + now_2b +
        '&scheduledDatetimeLocalMax=' + now_05b + '&arrivalDeparture=A';

    async.series({
        one: function (callback) {
            request.get({
                url: 'http://52.88.167.56' + dep_query,
                json: true
            }, (req, res, data) => {
                callback(null, data);
            })
        },
        two: function (callback) {
            request.get({
                url: 'http://52.88.167.56' + arr_query,
                json: true
            }, (req, res, data) => {
                callback(null, data);
            });
        }
    }, (err, results) => {
        let oneCount = results.one.recordCount || results.one.data.length;
        let twoCount = results.two.recordCount || results.two.data.length;
        callback(oneCount + twoCount);
    });
}

function xxx() {
    var aver = 0;
    for (var i = 0; i < 24; i++)
        aver += data[i];
    aver /= 24;

    var sd = 0;
    for (var i = 0; i < 24; i++)
        sd += (data[i] - aver) * (data[i] - aver);

    sd = Math.sqrt(sd / 23);

    var stats = {
        'FREE': [],
        'NORMAL': [],
        'BUSY': []
    };

    for (var i = 0; i < 24; i++) {
        if (aver - sd > data[i]) {
            stats['FREE'].push(i);
        } else if (aver + sd < data[i]) {
            stats['BUSY'].push(i);
        } else {
            stats['NORMAL'].push(i);
        }

    }
    console.log(stats);
}

Lounges({
    hours: [],
    chart: null,
    created() {
        const totals = [164, 157, 167, 180, 192, 198, 191, 192, 185, 147, 122, 126, 167, 117, 67, 49, 23, 3, 11, 63, 135, 153, 112, 111]
        window.setTimeout(function () {
            this.chart(c3.generate({
                bindto: '#chart',
                data: {
                    x: 'x',
                    columns: [
                        ['x', -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0],
                        ['Num. of Flights', ...totals]
                    ]
                }
            }));
        }, 500)
        // async.times(24, function (n, next) {
        //     callRequests(n, (total) => {
        //         next(null, total)
        //     });
        // }, (err, totals) => {
        //     totals = totals.reverse();

        //     this.hours(totals);
        //     console.log(totals)
        // });
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

        var tiles = $(".tile, .tile-small, .tile-square, .tile-wide, .tile-large, .tile-big, .tile-super, .tile-super-x");

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

        $("body").children().children().css("height", "100%");
    },
    render() {
        <div class="tile-area tile-area-scheme-dark fg-white"
             style="height: 100%; max-height: 100% !important; padding-right: 0px;">
            <h1 class="tile-area-title"><Link to={"/"}><span class="iconic icon mif-chevron-left"/></Link> Lounges.</h1>
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

            <div class="tile-group triple">
                <span class="tile-group-title"></span>

                <div class="tile-container">
                 <div class="tile-big-x tile-wide-y bg-white fg-dark" style="padding: 16">
                        <div class="carousel" data-role="carousel" data-auto="true" style="height: 100%">
                            <div class="slide"><img src="http://c1038.r38.cf3.rackcdn.com/group4/building39423/media/ywao_ed1663_fp412722.jpg" alt=""/></div>
                            <div class="slide"><img src="http://www.cathaypacific.com/content/dam/cx/digital-library/hk/press-release/archived/20100930_04.jpg" alt=""/></div>
                            <div class="slide"><img src="https://res.cloudinary.com/loungebuddy/image/upload/w_1400,h_1400,c_limit,q_90/v1457384870/blog/wp-content-uploads-2013-12-The-Bridge-1.jpg" alt=""/></div>
                        </div>
                    </div>
                    <br/>

                    <div class="tile-big-x bg-teal fg-white padding20">
                    <center style="font-size: 24px;">
                        The airport you're travelling to does not appear to be busy. <br/><br/>Walk into our designated lounge and enjoy the free buffet and luxury shower after your flight for an extremely discounted price.
                        </center>
                    </div>

                    <div class="tile-big-x bg-darkBlue fg-white padding20">
                        <b>Discounted Rate:</b> $300HKD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="button">Reserve a spot</button>
                    </div>
                </div>


            </div>

            <div class="tile-group triple">
                <span class="tile-group-title">Airport Congestion Levels</span>

                <div class="tile-container">
                    <div class="tile-big-x bg-white fg-dark" style="padding: 16">
                        <div id="chart">
                            <div data-role="preloader" data-type="cycle" data-style="color" b="unless: chart"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tile-group triple">
                <span class="tile-group-title"></span>

                <div class="tile-container">

                </div>
            </div>
        </div>
    }
})
