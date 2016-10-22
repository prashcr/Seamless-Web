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
        async.times(24, function (n, next) {
            callRequests(n, (total) => {
                next(null, total)
            });
        }, (err, totals) => {
            this.hours(totals);

            this.chart(c3.generate({
                bindto: '#chart',
                data: {
                    x: 'x',
                    columns: [
                        ['x', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                        ['Num. of Flights', ...totals]
                    ]
                }
            }));
        });
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

            <div class="tile-group">
                <div class="tile-super cell bg-teal">
                    Test
                </div>
            </div>

            <div class="tile-group">
                <div class="tile-super cell bg-white" style="max-height: 320px;">
                    <div id="chart" >
                        <div data-role="preloader" data-type="cycle" data-style="color" b="unless: chart"></div>
                    </div>
                </div>
            </div>
        </div>

    }
})