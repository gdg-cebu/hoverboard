import { Element } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/iron-icon/iron-icon.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../mixins/redux-mixin.js';
import './shared-styles.js';
import './hoverboard-icons.js';

class SubscribeBlock extends ReduxMixin(Element) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment"></style>

    <style>
        :host {
            display: flex;
            width: 100%;
            background: var(--default-primary-color);
            color: #fff;
            padding: 16px 0;
        }

        .description {
            font-size: 24px;
            line-height: 1.5;
            margin: 0 0 16px;
        }

         paper-button[disabled] {
            background: var(--default-primary-color);
            color: #fff;
         }

        @media (min-width: 640px) {
            :host {
                padding: 32px 0;
            }

            .description {
                font-size: 32px;
                margin: 0 0 24px;
                text-align: center;
            }
        }


    </style>

    <div class="container" layout="" vertical="" center\$="[[viewport.isTabletPlus]]">
        <div class="description"> {\$ subscribeBlock.callToAction.description \$} </div>
        <div class="cta-button">
            <paper-button class="animated icon-right" disabled\$="[[subscribed]]" on-tap="_subscribe" ga-on="click" ga-event-category="attendees" ga-event-action="subscribe" ga-event-label="subscribe block">
                <span class="cta-label">[[ctaLabel]]</span>
                <iron-icon icon\$="hoverboard:[[ctaIcon]]"></iron-icon>
            </paper-button>
        </div>
    </div>
`;
  }

  static get is() {
    return 'subscribe-block';
  }

  static get properties() {
    return {
      user: {
        type: Object,
        statePath: 'user',
      },
      viewport: {
        type: Object,
        statePath: 'ui.viewport',
      },
      subscribed: {
        type: Boolean,
        statePath: 'subscribed',
        observer: '_handleSubscribed',
      },
      ctaIcon: {
          type: String,
          value: 'arrow-right-circle',
      },
      ctaLabel: {
          type: String,
          value: '{$  subscribeBlock.callToAction.label $}',
      },
    };
  }

  _handleSubscribed(subscribed) {
      if (subscribed) {
         this.ctaIcon = 'checked';
         this.ctaLabel = '{$  subscribeBlock.subscribed $}';
      }
      else {
         this.ctaIcon = 'arrow-right-circle';
         this.ctaLabel = '{$  subscribeBlock.callToAction.label $}';
      }
  }

  _subscribe() {
         let userData = {};

         if (this.user.signedIn) {
             const fullNameSplit = this.user.displayName.split(' ');
             userData = {
                 firstFieldValue: fullNameSplit[0],
                 secondFieldValue: fullNameSplit[1],
             };
         }

         if (this.user.email) {
             subscribeActions.subscribe(Object.assign({}, { email: this.user.email }, userData));
         }
         else {
             dialogsActions.openDialog(DIALOGS.SUBSCRIBE, {
                 title: '{$ subscribeBlock.formTitle $}',
                 submitLabel: ' {$ subscribeBlock.subscribe $}',
                 firstFieldLabel: '{$ subscribeBlock.firstName $}',
                 secondFieldLabel: '{$ subscribeBlock.lastName $}',
                 firstFieldValue: userData.firstFieldValue,
                 secondFieldValue: userData.secondFieldValue,
                 submit: subscribeActions.subscribe,
             });
         }
     }
}

window.customElements.define(SubscribeBlock.is, SubscribeBlock);
