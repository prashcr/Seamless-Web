import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {App} from "./App";
import {Home} from "./Home/Home";
import {Login} from "./Login/Login";
import {Logout} from "./Login/Logout";
import {Info} from "./Info/Info";
import {Wifi} from "./Wifi/Wifi";
import {Lounges} from "./Lounges/Lounges";
import firebase from "firebase";

let config = {
    apiKey: "AIzaSyANKx7mgndq67Rj9RwCNyDwgReRwTxdmRM",
    authDomain: "seamless-ed5fc.firebaseapp.com",
    databaseURL: "https://seamless-ed5fc.firebaseio.com",
    storageBucket: "seamless-ed5fc.appspot.com",
    messagingSenderId: "993175486119"
};

firebase.initializeApp(config);


function requireAuth(nextState, replace) {
    if (!firebase.auth().currentUser) {
        let hasLocalStorageUser = false;
        for (let key in localStorage) {
            if (key.startsWith("firebase:authUser:")) {
                hasLocalStorageUser = true;
            }
        }
        if (!hasLocalStorageUser) {
            console.log('Attempting to access a secure route. Please authenticate first.');
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            });
        }
    }
}

function dontRequireAuth(nextState, replace) {
    if (!firebase.auth().currentUser) {
        let hasLocalStorageUser = false;
        for (let key in localStorage) {
            if (key.startsWith("firebase:authUser:")) {
                hasLocalStorageUser = true;
            }
        }
        if (hasLocalStorageUser) {
            console.log('Attempting to access a non-secure route. Please logout first.');
            replace({
                pathname: '/',
                state: {nextPathname: nextState.location.pathname}
            });
        }
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} onEnter={requireAuth}/>
            <Route path="login" component={Login} onEnter={dontRequireAuth}/>
            <Route path="logout" component={Logout} onEnter={requireAuth}/>
            <Route path="info" component={Info} onEnter={requireAuth}/>
            <Route path="wifi" component={Wifi} onEnter={requireAuth}/>
            <Route path="lounges" component={Lounges} onEnter={requireAuth}/>
        </Route>
    </Router>,
    document.getElementById("root"));
