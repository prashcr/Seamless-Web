import {RouteTransition} from "react-router-transition";
import firebase from "firebase";

App({
    loggedIn: false,
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            this.loggedIn(user ? true : false);
        });
    },
    render(){
        <div>
            {this.props.children}
        </div>
    }
});

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}