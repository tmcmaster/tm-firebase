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
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'tm-firebase',
      },
    };
  }
}

window.customElements.define('tm-firebase', TmFirebase);
