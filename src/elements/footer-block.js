import { Element } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/paper-fab/paper-fab.js';
import './footer-social.js';
import './footer-rel.js';
import './footer-nav.js';
import './hoverboard-icons.js';
import '../mixins/scroll-functions.js';

// eslint-disable-next-line no-undef
class FooterBlock extends ScrollFunctions(Element) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment positioning"></style>
    <style>

      :host {
        margin-top: 40px;
        display: block;
        position: relative;
        color: var(--footer-text-color);
        background: var(--footer-background-color);
        font-size: 14px;
        line-height: 1.5;
      }

      .container {
        margin: 0 auto;
        padding: 20px 0;
        position: relative;
      }

      .fab paper-fab {
        background: #fff;
        color: inherit;
        pointer-events: all;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.12), 0 8px 8px 0 rgba(0,0,0,0.24);
      }

      .fab {
        position: absolute;
        right: 25px;
        top: -25px;
        pointer-events: none;
        z-index: 1;
      }

      @media (min-width: 640px) {
        .container {
          padding: 15px 36px;
        }
      }

    </style>

    <div class="container">
      <div class="fab">
        <paper-fab class="back-to-top" icon="hoverboard:up" on-click="backToTop"></paper-fab>
      </div>
      <footer-social layout="" flex="" flex-auto="" horizontal="" wrap=""></footer-social>
      <footer-rel layout="" flex="" horizontal="" wrap=""></footer-rel>
      <footer-nav layout="" flex="" horizontal="" wrap=""></footer-nav>
    </div>
`;
  }

  static get is() {return 'footer-block';}

  backToTop(e) {
    this.scrollToY(0, 600, 'easeInOutSine');
  }
}

window.customElements.define(FooterBlock.is, FooterBlock);
