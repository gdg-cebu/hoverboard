import { Element } from '../../../@polymer/polymer/polymer-element.js';
import '../../../plastic-image/plastic-image.js';

class FooterNav extends Element {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment"></style>

    <style>

      :host {
        margin: 0 20px;
      }

      .copyright {
        padding: 15px 0 0;
        float: left;
      }

      .cod {
        display: block;
      }

      .nav-inline {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .footer-logo {
        margin: 10px 30px 0 0;
        height: 24px;
        width: 120px;
        float: left;
      }

      a {
        color: var(--footer-text-color);
        padding-bottom: 2px;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      @media (min-width: 768px) {
        :host {
          margin: 15px 0;
        }
      }

      @media (min-width: 505px) {

        .copyright {
          margin: 0;
          padding: 15px 0 0 0;
          float: right;
          text-align: right;
        }

        .cod {
          display: inline-flex;
        }
      }
    </style>

    <div class="nav-inline" layout="" flex="">

      <a href="{\$ organizer.url \$}" target="_blank" rel="noopener noreferrer">
        <plastic-image class="footer-logo" srcset="../../images/organizer-logo.svg" sizing="contain" alt="{\$ organizer.name \$}" lazy-load=""></plastic-image>
      </a>

      <div class="copyright">
        © [[_getYear()]] Based on <a href="https://github.com/gdg-x/hoverboard" target="_blank" rel="noopener noreferrer">Project
        Hoverboard</a> · <a class="cod" href="/cod" target="_blank" rel="noopener noreferrer">{\$ codeOfConduct
        \$}</a>

      </div>
    </div>
`;
  }

  static get is() {
    return 'footer-nav';
  }

  _getYear() {
    return new Date().getFullYear();
  }
}

window.customElements.define(FooterNav.is, FooterNav);
