import { Element } from '../../@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../@polymer/polymer/lib/utils/render-status.js';
import { importHref } from '../../@polymer/polymer/lib/utils/import-href.js';
import '../../@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '../../@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../../@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../@polymer/app-layout/app-drawer/app-drawer.js';
import '../../@polymer/app-layout/app-header/app-header.js';
import '../../@polymer/app-route/app-location.js';
import '../../@polymer/app-route/app-route.js';
import '../../@polymer/iron-media-query/iron-media-query.js';
import '../../iron-lazy-pages/iron-lazy-pages.js';
import '../../@polymer/iron-selector/iron-selector.js';
import '../../@polymer/iron-icon/iron-icon.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/paper-menu-button/paper-menu-button.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/paper-tabs/paper-tabs.js';
import '../../plastic-image/plastic-image.js';
import './mixins/utils-functions.js';
import './mixins/redux-mixin.js';
import './mixins/scroll-functions.js';
import './elements/shared-styles.js';
import './elements/hoverboard-icons.js';
import './elements/header-toolbar.js';
import './elements/hero-block.js';
import './elements/footer-block.js';
import './elements/hoverboard-analytics.js';
import './effects/transparent-scroll.js';
import { setPassiveTouchGestures } from '../../@polymer/polymer/lib/utils/settings.js';
// eslint-disable-next-line no-undef
class HoverboardApp extends UtilsFunctions(ScrollFunctions(ReduxMixin(Element))) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-reverse flex-alignment positioning"></style>
    <style>
      :host {
        display: block;
        position: relative;
        min-height: 100%;
        height: 100%;
        --paper-menu-button-dropdown-background: #fff;
        --app-drawer-content-container: {
          display: flex;
          flex-direction: column;
        };
      }

      app-drawer app-toolbar {
        padding: 36px 24px 24px;
        border-bottom: 1px solid var(--divider-color);
      }

      app-drawer .dates {
        margin-top: 42px;
        font-size: 22px;
        line-height: 0.95;
      }

      app-drawer .location {
        margin-top: 4px;
        font-size: 15px;
        color: var(--secondary-text-color);
      }

      .drawer-list {
        padding: 16px 0;
        display: block;
      }

      .drawer-list a {
        display: block;
        color: var(--primary-text-color);
        outline: 0;
      }

      app-drawer a {
        padding: 8px 24px;
      }

      .drawer-list a.selected {
        font-weight: 500;
      }

      app-toolbar {
        height: auto;
      }

      .toolbar-logo {
        --iron-image-height: 32px;
      }

      app-header-layout {
        margin-top: -1px;
      }

      app-header.remove-shadow::before {
        opacity: 0;
      }

      iron-lazy-pages {
        background-color: #fff;
        min-height: 100%;
        height: 100%;
      }

      .drawer-content iron-icon {
        --iron-icon-width: 14px;
        margin-left: 6px;
      }

      .buy-ticket {
        padding: 16px 24px;
      }

      @media (min-width: 640px) {
        app-toolbar {
          padding: 0 36px;
          height: initial;
        }
      }
    </style>

    <iron-media-query id="mq-phone" full="" query="(max-width: {\$ mediaQueries.xs.max \$})" query-matches="{{isPhoneSize}}"></iron-media-query>
    <iron-media-query id="mq-laptop" full="" query="(min-width: {\$ mediaQueries.md.min \$})" query-matches="{{isLaptopSize}}"></iron-media-query>

    <app-location route="{{appRoute}}"></app-location>
    <app-route route="{{appRoute}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{queryParams}}"></app-route>

    <app-drawer-layout drawer-width="300px" force-narrow="" fullbleed="">

      <app-drawer id="drawer" slot="drawer" opened="[[ui.isDrawerOpened]]" swipe-open="">
        <app-toolbar layout="" vertical="" start="">
          <plastic-image class="toolbar-logo" srcset="/images/logo-monochrome.svg" alt="{\$ title \$}"></plastic-image>
          <h2 class="dates">{\$ dates \$}</h2>
          <h3 class="location">{\$ location.short \$}</h3>
        </app-toolbar>

        <div class="drawer-content" layout="" vertical="" justified="" flex="">
          <iron-selector class="drawer-list" selected="[[route.route]]" attr-for-selected="path" selected-class="selected" role="navigation">
            {% for nav in navigation %}
            <a href="{\$ nav.permalink \$}" path="{\$ nav.route \$}" on-tap="closeDrawer">{\$ nav.title \$}</a>
            {% endfor %}
          </iron-selector>

          <a class="buy-ticket" href\$="[[tickets.url]]" target="_blank" rel="noopener noreferrer" ga-on="click" ga-event-category="ticket button" ga-event-action="buy_click" layout="" horizontal="" center="">
            <span>{\$ buyTicket \$}</span>
            <iron-icon icon="hoverboard:open-in-new"></iron-icon>
          </a>
        </div>

      </app-drawer>

      <app-header-layout id="headerLayout" fullbleed="">

        <app-header id="header" slot="header" effects="waterfall transparent-scroll" condenses="" fixed="">
          <header-toolbar></header-toolbar>
        </app-header>

        <iron-lazy-pages attr-for-selected="data-route" selected="[[route.route]]" selected-attribute="active" hide-immediately="">
          <home-page data-route="home" data-path="pages/home-page.html"></home-page>
          <blog-page data-route="blog" data-path="pages/blog-page.html" route="[[subroute]]"></blog-page>
          <schedule-page data-route="schedule" data-path="pages/schedule-page.html" route="[[subroute]]"></schedule-page>
          <speakers-page data-route="speakers" data-path="pages/speakers-page.html" route="[[subroute]]"></speakers-page>
          <team-page data-route="team" data-path="pages/team-page.html"></team-page>
          <faq-page data-route="faq" data-path="pages/faq-page.html"></faq-page>
        </iron-lazy-pages>

      </app-header-layout>
    </app-drawer-layout>

    <video-dialog opened="[[ui.videoDialog.opened]]" video-title="[[ui.videoDialog.title]]" youtube-id="[[ui.videoDialog.youtubeId]]" entry-animation="scale-up-animation" exit-animation="fade-out-animation" disable-controls="[[!ui.videoDialog.disableControls]]" fit="" fixed-top=""></video-dialog>


    <speaker-details opened="[[dialogs.speaker.isOpened]]" speaker="[[dialogs.speaker.data]]" with-backdrop="[[viewport.isTabletPlus]]" no-cancel-on-outside-click="[[viewport.isPhone]]"></speaker-details>

    <session-details opened="[[dialogs.session.isOpened]]" session="[[dialogs.session.data]]" with-backdrop="[[viewport.isTabletPlus]]" no-cancel-on-outside-click="[[viewport.isPhone]]"></session-details>

    <subscribe-dialog opened="[[dialogs.subscribe.isOpened]]" data="[[dialogs.subscribe.data]]" with-backdrop="" no-cancel-on-outside-click="[[viewport.isPhone]]">
    </subscribe-dialog>

    <signin-dialog opened="[[dialogs.signin.isOpened]]" with-backdrop="">
    </signin-dialog>

    <hoverboard-analytics></hoverboard-analytics>
    <toast-element></toast-element>
`;
  }

  static get is() {
    return 'hoverboard-app';
  }

  static get properties() {
    return {
      ui: {
        type: Object,
        statePath: 'ui',
      },
      route: {
        type: String,
        statePath: 'routing',
      },
      dialogs: {
        type: Object,
        statePath: 'dialogs',
        observer: '_dialogToggled',
      },
      viewport: {
        type: Object,
        statePath: 'ui.viewport',
      },
      schedule: {
        type: Object,
        statePath: 'schedule',
      },
      notifications: {
        type: Boolean,
        statePath: 'notifications',
      },
      _openedDialog: {
        type: String,
      },
      user: {
        type: Object,
        statePath: 'user',
      },
      providerUrls: {
        type: Object,
        value: '{$ signInProviders.allowedProvidersUrl $}',
      },
      tickets: {
        type: Object,
        statePath: 'tickets',
      },
    };
  }

  static get observers() {
    return [
      '_routeDataChanged(routeData.page, subroute.path)',
      '_viewportChanged(isPhoneSize, isLaptopSize)',
    ];
  }

  constructor() {
    super();
    setPassiveTouchGestures(true);
    window.performance && performance.mark && performance.mark('hoverboard-app.created');
    this._removeQueryParams = this._removeQueryParams.bind(this);
    this._toggleHeaderShadow = this._toggleHeaderShadow.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('reset-query-params', this._removeQueryParams);
    window.addEventListener('element-sticked', this._toggleHeaderShadow);
    window.addEventListener('offline', () => {
      toastActions.showToast({
        message: '{$ offlineMessage $}',
      });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('reset-query-params', this._removeQueryParams);
    window.removeEventListener('element-sticked', this._toggleHeaderShadow);
  }

  ready() {
    super.ready();
    // eslint-disable-next-line no-console
    console.log('Hoverboard v2 is ready!');
    this.removeAttribute('unresolved');
    this._ensureLazyLoaded();
    userActions.autoSignIn();
  }

  closeDrawer() {
    uiActions.toggleDrawer(false);
  }

  _ensureLazyLoaded() {
    if (!this.loadComplete) {
      afterNextRender(this, () => {
        importHref(this.resolveUrl('lazy-resources.html'), () => {
          this.loadComplete = true;
          notificationsActions.initializeMessaging()
            .then(notificationsActions.getToken);
        });
      });
    }
  }

  _routeDataChanged(page, subroutePath) {
    if (!page && page !== '') {
      return;
    }
    const hasSubroute = subroutePath !== '' && subroutePath !== '/';

    if (!this.route || (page !== this.route.route)) {
      !hasSubroute && this.scrollToY(0, 100);
      routingActions.setRoute(page);
      this.$.header.classList.remove('remove-shadow');
    }
  }

  _viewportChanged(isPhoneSize, isLaptopSize) {
    uiActions.setViewportSize({
      isPhone: isPhoneSize,
      isTabletPlus: !isPhoneSize,
      isLaptopPlus: isLaptopSize,
    });
  }

  _dialogToggled(dialogs) {
    if (this._openedDialog) {
      document.body.style.overflow = '';
      this._openedDialog = null;
    }
    this._openedDialog = Object.keys(dialogs).find((key) => dialogs[key].isOpened);
    if (this._openedDialog) {
      document.body.style.overflow = 'hidden';
    }
  }

  _removeQueryParams() {
    this.set('queryParams', null);
  }

  _toggleHeaderShadow(e) {
    this.$.header.classList.toggle('remove-shadow', e.detail.sticked);
  }
}

window.customElements.define(HoverboardApp.is, HoverboardApp);
