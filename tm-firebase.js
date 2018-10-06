import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


/**
 * `tm-firebase`
 * Firebase related web components
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TmFirebase extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        img.firebaseui-idp-icon {
            src: url("https://raw.githubusercontent.com/firebase/firebaseui-web/master/image/twitter.svg");
        }
        #loader {
            width:100%;
            text-align: center;
        }
      </style>
      
      <link type="text/css" rel="stylesheet" href="../lib/firebaseui.css" />
      <link type="text/css" rel="stylesheet" href="/node_modules/tm-firebase/lib/firebaseui.css" />

      <div id="auth"></div>
      <div id="loader">Loading...</div>
    `;
    }

    static get properties() {
        return {
            user: {
                type: Object,
                value: {},
                observer: '_userChanged',
                notify: true
            },
            config: {
                type: Object,
                observer: '_configChanged'
            },
            providers: {
                type: Array,
                value: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
                observer: '_providersChanged'
            }
        };
    }

    _providersChanged(aaa) {
        console.log('PROVIDERS: ', aaa)
    }
    _userChanged(user) {
        console.log('User: ', user);
    }
    _configChanged(config) {
        console.log('CONFIG: ', config)
    }

    ready() {
        super.ready();
        console.log('dfsdfsfsf');
        const self = this;
        window.onload = function () {
            if (self.config !== undefined) {
                self.setupFirebase();
            }
        };
    }


    setupFirebase() {
        var self = this;
        // var config = {
        //     apiKey: "AIzaSyBYHSuS_qzcYUnwAc3KG_LSzhSN9wXDewU",
        //     authDomain: "stunt-hamster.firebaseapp.com",
        //     databaseURL: "https://stunt-hamster.firebaseio.com",
        //     projectId: "stunt-hamster",
        //     storageBucket: "stunt-hamster.appspot.com",
        //     messagingSenderId: "651006465873"
        // };
        firebase.initializeApp(this.config);
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    self.user = {
                        uid: authResult.user.uid,
                        name: authResult.user.displayName,
                        email: authResult.user.email
                    };
                    return false;
                },
                signInWithRedirect: function () {
                    return false;
                },
                signInSuccess: function (currentUser, credential, redirectUrl) {
                    console.log('Current User', currentUser);
                    return false;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    self.$.loader.style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            //signInSuccessUrl: 'http://localhost:8081/components/stunt-hamster/?mode=done',
            signInOptions: this.providers,
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        const el = this.$.auth;
        ui.start(el, uiConfig);
    }
}

window.customElements.define('tm-firebase', TmFirebase);
