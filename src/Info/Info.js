/**
 * Created by Kenta Iwasaki on 10/22/2016.
 */

import {Link} from "react-router";
import "../tile.css";
import "../flex.css";

Info({
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
            <h1 class="tile-area-title"><Link to={"/"}><span class="iconic icon mif-chevron-left"/></Link> Flight Info.</h1>
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

                    <a href="#" class="tile-wide bg-darkBlue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-cloudy"></span>
                        </div>
                        <span class="tile-label">Altitude: 40,000ft.</span>
                    </a>

                    <div class="tile-wide bg-blue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-thermometer"></span>
                        </div>
                        <span class="tile-label">Temperature: -51°C</span>
                    </div>

                    <div class="tile-wide bg-teal fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-space-shuttle mif-4x"></span>
                        </div>
                        <span class="tile-label">Time to Destination: (2:22)</span>
                    </div>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title"></span>

                <div class="tile-container">

                    <a href="#" class="tile-wide bg-indigo fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-my-location"></span>
                        </div>
                        <span class="tile-label">Flight: CX350</span>
                    </a>

                    <div class="tile-large bg-blue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-display"></span>
                        </div>
                        <span class="tile-label">Seat: 13A</span>
                    </div>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title"></span>

                <div class="tile-container">

                    <a href="#" class="tile-wide bg-indigo fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-steps"></span>
                        </div>
                        <span class="tile-label">From: Hong Kong</span>
                    </a>

                    <div class="tile-large bg-blue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-organization"></span>
                        </div>
                        <span class="tile-label">Destination: Taipei</span>
                    </div>
                </div>
            </div>
        </div>
    }
})