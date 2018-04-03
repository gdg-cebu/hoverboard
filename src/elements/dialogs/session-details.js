import { Element } from '../../../../@polymer/polymer/polymer-element.js';
import '../../../../@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../../../@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../../../@polymer/paper-fab/paper-fab.js';
import '../../../../plastic-image/plastic-image.js';
import '../../../../@polymer/iron-icon/iron-icon.js';
import { IronOverlayBehavior } from '../../../../@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import '../../../../@polymer/marked-element/marked-element.js';
import '../../mixins/utils-functions.js';
import '../../mixins/redux-mixin.js';
import '../text-truncate.js';
import '../shared-styles.js';
import './dialog-styles.js';
import { mixinBehaviors } from '../../../../@polymer/polymer/lib/legacy/class.js';

// eslint-disable-next-line no-undef
class SessionDetails extends UtilsFunctions(
  ReduxMixin(mixinBehaviors([IronOverlayBehavior], Element))
) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles dialog-styles flex flex-alignment positioning"></style>

    <app-header-layout has-scrolling-region="">
      <app-header slot="header" class="header" fixed="[[viewport.isTabletPlus]]">
        <iron-icon class="close-icon" icon="hoverboard:[[_getCloseBtnIcon(viewport.isLaptopPlus)]]" on-tap="_close"></iron-icon>
        <app-toolbar>
          <div class="dialog-container header-content" layout="" vertical="" end-justified="">
            <h2 class="name">[[session.title]]</h2>
            <div class="tags" hidden\$="[[!session.tags.length]]">
              <template is="dom-repeat" items="[[session.tags]]" as="tag">
                <span class="tag" style\$="color: [[_getTagColor(tag)]]">[[tag]]</span>
              </template>
            </div>

            <div class="float-button">
              <paper-fab icon="hoverboard:[[_getFeaturedSessionIcon(featuredSessions, session.id)]]" hidden\$="[[!viewport.isLaptopPlus]]" on-tap="_toggleFeaturedSession"></paper-fab>
            </div>
          </div>
        </app-toolbar>
      </app-header>

      <div class="dialog-container content">
        <div class="float-button">
          <paper-fab icon="hoverboard:[[_getFeaturedSessionIcon(featuredSessions, session.id)]]" hidden\$="[[viewport.isLaptopPlus]]" on-tap="_toggleFeaturedSession"></paper-fab>
        </div>
        <h3 class="meta-info">[[session.dateReadable]], [[session.startTime]] - [[session.endTime]]</h3>
        <h3 class="meta-info">[[session.track.title]]</h3>
        <h3 class="meta-info" hidden\$="[[!session.complexity]]">{\$ sessionDetails.contentLevel \$}:
          [[session.complexity]]</h3>

        <marked-element class="description" markdown="[[session.description]]">
          <div slot="markdown-html"></div>
        </marked-element>

        <div class="actions" layout="" horizontal="">
          <a class="action" href\$="[[session.presentation]]" hidden\$="[[!session.presentation]]" target="_blank" rel="noopener noreferrer" layout="" horizontal="" center-aligned="">
            <iron-icon icon="hoverboard:presentation"></iron-icon>
            <span>{\$ sessionDetails.viewPresentation \$}</span>
          </a>
          <div class="action" hidden\$="[[!session.videoId]]" on-tap="_openVideo" layout="" horizontal="" center-aligned="">
            <iron-icon icon="hoverboard:video"></iron-icon>
            {\$ sessionDetails.viewVideo \$}
          </div>
        </div>

        <div class="additional-sections" hidden\$="[[!session.speakers.length]]">
          <h3>{\$ sessionDetails.speakers \$}</h3>

          <template is="dom-repeat" items="[[session.speakers]]" as="speaker">
            <a href\$="/speakers/[[speaker.id]]" class="section" on-tap="close">
              <div layout="" horizontal="" center="">
                <plastic-image class="section-photo" srcset="[[speaker.photoUrl]]" sizing="cover" lazy-load="" preload="" fade=""></plastic-image>

                <div class="section-details" flex="">
                  <div class="section-primary-text">[[speaker.name]]</div>
                  <div class="section-secondary-text">[[speaker.company]] / [[speaker.country]]</div>
                </div>
              </div>
            </a>
          </template>
        </div>
      </div>
    </app-header-layout>
`;
  }

  static get is() {
    return 'session-details';
  }

  static get properties() {
    return {
      session: {
        type: Object,
      },
      viewport: {
        type: Object,
        statePath: 'ui.viewport',
      },
      user: {
        type: Object,
        statePath: 'user',
      },
      featuredSessions: {
        type: Object,
        statePath: 'sessions.featured',
      },
    };
  }

  constructor() {
    super();
    this.addEventListener('iron-overlay-canceled', this._close);
  }

  static get observers() {
    return [
      '_handleClose(opened, session)',
    ];
  }

  _close() {
    dialogsActions.closeDialog(DIALOGS.SESSION);
    this.dispatchEvent(new CustomEvent('reset-query-params', {
      bubbles: true,
      composed: true,
    }));
  }

  _handleClose(opened, session) {
    if (!opened && session && Object.keys(session).length) {
      dialogsActions.closeDialog(DIALOGS.SESSION);
    }
  }

  _getTagColor(value) {
    if (ShadyCSS) {
      return ShadyCSS.getComputedStyleValue(this, `--${this.generateClassName(value)}`);
    }
    return getComputedStyle(this, `--${this.generateClassName(value)}`);
  }

  _getCloseBtnIcon(isLaptopViewport) {
    return isLaptopViewport ? 'close' : 'arrow-left';
  }

  _openVideo() {
    uiActions.toggleVideoDialog({
      title: this.session.title,
      youtubeId: this.session.videoId,
      disableControls: true,
      opened: true,
    });
  }

  _toggleFeaturedSession(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.user.signedIn) {
      toastActions.showToast({
        message: '{$ schedule.saveSessionsSignedOut $}',
        action: {
          title: 'Sign in',
          callback: () => {
            dialogsActions.openDialog(DIALOGS.SIGNIN);
          },
        },
      });
      return;
    }
    const sessions = Object.assign({}, this.featuredSessions, {
      [this.session.id]: !this.featuredSessions[this.session.id] ? true : null,
    });

    sessionsActions.setUserFeaturedSessions(this.user.uid, sessions);
  }

  _getFeaturedSessionIcon(featuredSessions, sessionId) {
    return featuredSessions && featuredSessions[sessionId] ? 'bookmark-check' : 'bookmark-plus';
  }
}

window.customElements.define(SessionDetails.is, SessionDetails);
