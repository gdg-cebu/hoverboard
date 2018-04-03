import { Element } from '../../../@polymer/polymer/polymer-element.js';
import '../../../google-youtube/google-youtube.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import { PaperDialogBehavior } from '../../../@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../mixins/redux-mixin.js';
import './shared-styles.js';
import { mixinBehaviors } from '../../../@polymer/polymer/lib/legacy/class.js';
class VideoDialog extends ReduxMixin(
  mixinBehaviors([PaperDialogBehavior], Element)
) {
  static get template() {
    return `
    <style is="custom-style" include="positioning"></style>

    <style>
      :host {
        margin: 0;
        padding: 0;
      }

      .video-wrapper {
        z-index: 6;
        overflow: hidden;
      }

      .go-back-icon {
        margin: 16px;
        z-index: 7;
        width: 40px;
        height: 40px;
        color: #fff;
        opacity: 0.6;
        background-color: #000;
        border-radius: 50%;
        display: block;
        transition: opacity var(--animation);
      }

      .go-back-icon:hover {
        opacity: 0.9;
      }

      .video {
        padding: 0;
      }

    </style>

    <div class="toolbar">
      <paper-icon-button class="go-back-icon" icon="hoverboard:close" on-tap="_closeSelf" dialog-dismiss=""></paper-icon-button>
    </div>
    <div class="video-wrapper">
      <google-youtube id="video" class="video" video-id="[[youtubeId]]" width="100%" height="100%" autohide="1" chromeless="[[disableControls]]" fit="">
      </google-youtube>
    </div>
`;
  }

  static get is() {
    return 'video-dialog';
  }

  static get properties() {
    return {
      videoTitle: String,
      opened: {
        type: Boolean,
        observer: 'videoDialogActionMade',
      },
      youtubeId: String,
      disableControls: {
        type: Boolean,
        value: false,
      },
    };
  }

  videoDialogActionMade() {
    if (this.opened) {
      if (this.withBackdrop) {
        this.backdropElement.open();
      }
      this.$.video.play();
    }
    else {
      this.$.video.seekTo(0);
      this.$.video.pause();
      this.backdropElement.close();
      this.opened = false;
    }
  }

  _closeSelf() {
    uiActions.toggleVideoDialog({
      opened: false,
      disableControls: false,
      youtubeId: '',
      title: '',
    });
  }
}

window.customElements.define(VideoDialog.is, VideoDialog);
