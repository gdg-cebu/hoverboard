import { Element } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/iron-icon/iron-icon.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/marked-element/marked-element.js';
import '../../../plastic-image/plastic-image.js';
import '../mixins/redux-mixin.js';
import './hoverboard-icons.js';
class AboutOrganizerBlock extends ReduxMixin(Element) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment positioning"></style>

    <style>
      :host {
        display: block;
      }

      .block:not(:last-of-type) {
        margin-bottom: 32px;
      }

      .team-icon {
        --iron-icon-height: 160px;
        --iron-icon-width: 160px;
        --iron-icon-fill-color: var(--default-primary-color);
        max-width: 50%;
      }

      .image-link {
        width: 80%;
        height: 80%;
      }

      .organizers-photo {
        width: 100%;
        height: 100%;
      }

      .description {
        color: var(--secondary-text-color);
      }

      paper-button {
        margin: 0;
      }
    </style>

    <div class="container" layout="" horizontal="">
      <div layout="" horizontal="" center-center="" flex="" hidden\$="[[viewport.isPhone]]">

        <a href="/team" class="image-link" ga-on="click" ga-event-category="link" ga-event-action="open" ga-event-label="open team page">
          <plastic-image class="organizers-photo card" srcset="{\$ aboutOrganizerBlock.image \$}" sizing="cover" lazy-load="" preload="" fade=""></plastic-image>
        </a>
      </div>

      <div class="description-block" flex="">
        {% for block in aboutOrganizerBlock.blocks %}
        <div class="block">
          <h2>{\$ block.title \$}</h2>

          <marked-element class="description" markdown="{\$ block.description \$}">
            <div slot="markdown-html"></div>
          </marked-element>
          <a href="{\$ block.callToAction.link \$}" {%="" if="" block.calltoaction.newtab="" %}="" target="_blank" rel="noopener noreferrer" endif="">
            <paper-button class="cta-button animated icon-right">
              <span>{\$ block.callToAction.label \$}</span>
              <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
            </paper-button>
          </a>
        </div>
        {% endfor %}
      </div>
    </div>
`;
  }

  static get is() {
    return 'about-organizer-block';
  }

  static get properties() {
    return {
      viewport: {
        type: Object,
        statePath: 'ui.viewport',
      },
    };
  }
}

customElements.define(AboutOrganizerBlock.is, AboutOrganizerBlock);
