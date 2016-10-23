/**
 * Created by Kenta Iwasaki on 10/22/2016.
 */

import firebase from "firebase";
import {Link} from "react-router";
import "./home.css";
import "../tile.css";
import "../flex.css";

Home({
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
        <div class="tile-area tile-area-scheme-dark cathay-background fg-white" style="height: 100%; max-height: 100% !important;">
            <div class="overlay"/>
            <h1 class="tile-area-title">Seamless.</h1>
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
                <span class="tile-group-title">General</span>

                <div class="tile-container">

                    <a href="#" class="tile bg-indigo fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-calendar"></span>
                        </div>
                        <span class="tile-label">Timeline</span>
                    </a>

                    <Link to={'/wifi'} class="tile bg-blue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-wifi-full"></span>
                        </div>
                        <span class="tile-label">Wi-Fi</span>
                    </Link>

                    <Link to={'/lounges'} class="tile-large bg-teal fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-location-city mif-4x"></span>
                        </div>
                        <span class="tile-label">Lounges</span>
                    </Link>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">Your Journey</span>

                <div class="tile-container">
                    <Link to={"/info"} class="tile-wide bg-darkGray fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-space-shuttle"></span>
                        </div>
                        <span class="tile-label">Flight Info</span>
                    </Link>

                    <Link to={'/payments'} class="tile-wide bg-green fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-dollars"></span>
                        </div>
                        <span class="tile-label">Payments</span>
                    </Link>

                    <div class="tile bg-brown fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-ring-volume"></span>
                        </div>
                        <span class="tile-label">Meals</span>
                    </div>

                    <div class="tile bg-yellow fg-black">
                        <div class="tile-content iconic">
                            <span class="icon mif-discout mif-4x"></span>
                        </div>
                        <span class="tile-label">Asia Miles</span>
                    </div>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">Social</span>

                <div class="tile-container">
                    <a href="#" class="tile bg-darkBlue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-facebook"></span>
                        </div>
                        <span class="tile-label">Facebook</span>
                    </a>

                    <a href="#" class="tile bg-blue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-twitter"></span>
                        </div>
                        <span class="tile-label">Twitter</span>
                    </a>

                    <a href="#" class="tile bg-white fg-red">
                        <div class="tile-content iconic">
                            <span class="icon mif-youtube"></span>
                        </div>
                        <span class="tile-label">YouTube</span>
                    </a>

                    <div class="tile bg-red fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-yelp"></span>
                        </div>
                        <span class="tile-label">Yelp</span>
                    </div>

                    <div class="tile-wide bg-blue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-skype mif-4x"></span>
                        </div>
                        <span class="tile-label">Skype</span>
                    </div>
                </div>
            </div>

            <div class="tile-group double">
                <span class="tile-group-title">Media</span>

                <div class="tile-container">
                    <a href="#" class="tile bg-amber fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-video-camera"></span>
                        </div>
                        <span class="tile-label">Movies</span>
                    </a>

                    <a href="#" class="tile bg-green fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-gamepad"></span>
                        </div>
                        <span class="tile-label">Games</span>
                    </a>

                    <Link to={'/music'} class="tile bg-pink fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-headphones"></span>
                        </div>
                        <span class="tile-label">Music</span>
                    </Link>

                    <div class="tile bg-darkBlue fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-cloud"></span>
                        </div>
                        <span class="tile-label">OneDrive</span>
                    </div>

                    <div class="tile bg-darkGreen fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-shopping-basket mif-4x"></span>
                        </div>
                        <span class="tile-label">Store</span>
                    </div>

                    <div class="tile bg-teal fg-white">
                        <div class="tile-content iconic">
                            <span class="icon mif-pencil mif-4x"></span>
                        </div>
                        <span class="tile-label">Settings</span>
                    </div>
                </div>
            </div>
        </div>


    }
})
