/**
 * Created by Kenta Iwasaki on 10/22/2016.
 */
import firebase from "firebase";
import QRCode from "qrcode.react";
import * as React from "react";
import "./login.css";
import "../flex.css";

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

Login({
    loggingIn: false,
    size: 256,
    code: "",
    login() {
        this.loggingIn(true);

        let self = this;
        firebase.auth().signInWithEmailAndPassword("dranithix@gmail.com", "testtest").then((result) => {
            self.loggingIn(false);
            this.context.router.replace('/');
        });
    },
    created() {
        this.code(guid());
        this.firebaseRef = firebase.database().ref("logins").child(this.code());
        this.firebaseRef.set({loggedIn: false});
        this.firebaseRef.on("value", (dataSnapshot) => {
            let profile = dataSnapshot.val();
            if (profile && profile.loggedIn) {
                this.login();
            }
        }).bind(this);

    },
    destroyed() {
        this.firebaseRef.remove();
    },
    rendered() {
        var form = $(".login-form");

        form.css({
            opacity: 1,
            "-webkit-transform": "scale(1)",
            "transform": "scale(1)",
            "-webkit-transition": ".5s",
            "transition": ".5s"
        });

        this.size($(".grid").width());
        $(window).resize(() => {
            this.size($(".grid").width());
        });
    },
    render() {
        <div class="login-form padding20 block-shadow">
            <h1 class="text-light">Welcome. </h1>
            <hr class="thin"/>
            <br />
            <div class="grid">
                <div class="row cells6 image-container center" >
                    <div class="row cells1" b="if: loggingIn">
                        <div class="cell padding20">
                            <div data-role="preloader" data-type="square" data-style="color"
                                                      style="margin: auto;"></div>
                        </div>
                    </div>
                    <QRCode value={this.code()} size={this.size()} />
                </div>
            </div>

            <br/>
            <div class="form-actions center">
                <button type="submit" class="button primary" b="unless: loggingIn, click: login">Login here.</button>
                <button type="submit" class="button primary" b="if: loggingIn">Logging in...
                </button>
            </div>
        </div>
    }
})

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
}