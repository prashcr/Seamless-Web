/**
 * Created by Kenta Iwasaki on 10/22/2016.
 */
import firebase from "firebase";
import * as React from "react";

Logout({
    rendered() {
        let self = this;
        firebase.auth().signOut().then(() => {
            this.context.router.replace('/');
        });
    },
    render() {
        <div class="center">
            <p style="font-size: 32px;">Logging out...</p>
        </div>
    }
})

Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
}