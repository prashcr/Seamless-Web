/**
 * Created by Kenta Iwasaki on 10/22/2016.
 */

import {Link} from "react-router";
import "../tile.css";
import "../flex.css";

Wifi({
    created() {
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

        $("body").children().children().css("height", "100%");
    },
    render() {
        <div class="tile-area tile-area-scheme-dark fg-white" style="height: 100%; max-height: 100% !important;">
            <h1 class="tile-area-title"><Link to={"/"}><span class="iconic icon mif-chevron-left"/></Link> Wi-Fi.</h1>
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
                <span class="tile-group-title"></span>

                <div class="tile-container">

                    <a href="#" class="tile-wide tile-big-y bg-indigo fg-white">
                        <div class="tile-content iconic fill">
                            <span class="icon mif-wifi-full"></span>
                        </div>
                        <span class="tile-label">You are now connected.</span>
                    </a>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title"></span>

                <div class="tile-container">
                    <div class="tile-big-y bg-white fg-white">
                        <div class="listview-outlook" data-role="listview">
                            <div class="list-group ">
                                <span class="list-group-toggle">Today</span>
                                <div class="list-group-content">
                                    <a class="list" href="#">
                                        <div class="list-content">
                                            <span class="list-title"><span class="place-right icon-flag-2 fg-red smaller"></span>WiFi Usage</span>
                                            <span class="list-subtitle"><span class="place-right">$15</span>Charged on 26/10/2013</span>
                                            <span class="list-remark">Flight from HK to Taipei</span>
                                        </div>
                                    </a>
                                    <a class="list" href="#">
                                        <div class="list-content">
                                            <span class="list-title"><span class="place-right icon-flag-2 fg-green smaller"></span>WiFi Usage</span>
                                            <span class="list-subtitle"><span class="place-right">$15</span>Charged on 26/10/2013</span>
                                            <span class="list-remark">Flight from Taipei to HK</span>
                                        </div>
                                    </a>
                                    <a class="list" href="#">
                                        <div class="list-content">
                                            <span class="list-title">WiFi Usage</span>
                                            <span class="list-subtitle"><span class="place-right">$8</span>Charged on 26/10/2013</span>
                                            <span class="list-remark">Flight from HK to Beijing</span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="list-group collapsed">
                                <span class="list-group-toggle">Yesterday</span>
                                <div class="list-group-content">
                                    <a class="list" href="#">
                                        <div class="list-content">
                                            <span class="list-title"><span class="place-right icon-flag-2 fg-red smaller"></span>WiFi Usage</span>
                                            <span class="list-subtitle"><span class="place-right">$15</span>Charged on 26/10/2013</span>
                                            <span class="list-remark">Flight from HK to Taipei</span>
                                        </div>
                                    </a>
                                    <a class="list" href="#">
                                        <div class="list-content">
                                            <span class="list-title"><span class="place-right icon-flag-2 fg-green smaller"></span>WiFi Usage</span>
                                            <span class="list-subtitle"><span class="place-right">$15</span>Charged on 26/10/2013</span>
                                            <span class="list-remark">Flight from Taipei to HK</span>
                                        </div>
                                    </a>
                                    <a class="list" href="#">
                                        <div class="list-content">
                                            <span class="list-title">WiFi Usage</span>
                                            <span class="list-subtitle"><span class="place-right">$8</span>Charged on 26/10/2013</span>
                                            <span class="list-remark">Flight from HK to Beijing</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title"></span>

                <div class="tile-container">
                    <div class="tile-big-y bg-white fg-dark">
                        <div class="listview" data-role="listview" style="padding: 16">
                            <div class="list-group">
                                <span class="list-group-toggle">My devices</span>
                                <div class="list-group-content">
                                    <div class="list">
                                        <span class="list-icon mif-laptop"></span>
                                        <span class="list-title">KENTA-PC</span>
                                    </div>
                                    <div class="list">
                                        <span className="list-icon mif-tablet"></span>
                                        <span class="list-title">KEITA-TAB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
});
