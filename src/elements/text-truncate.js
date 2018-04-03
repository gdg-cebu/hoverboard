import { Element } from '../../../@polymer/polymer/polymer-element.js';
import { FlattenedNodesObserver } from '/node_modules/@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import '../../../clamp-js/clamp.min.js';

class TextTruncate extends Element {
  static get template() {
    return `
    <slot id="text"></slot>
`;
  }

  static get is() {
    return 'text-truncate';
  }

  static get properties() {
    return {
      lines: {
        type: String,
        value: '2',
      },
    };
  }

  ready() {
    super.ready();
    this._observer = new FlattenedNodesObserver(this.$.text, (info) => {
      const target = info.addedNodes.filter(function (node) {
        return (node.nodeType === Node.ELEMENT_NODE);
      })[0];
      // eslint-disable-next-line no-undef
      $clamp(target, { clamp: this._getClampValue() });
    });
  }

  _getClampValue() {
    if (!isNaN(this.lines)) {
      return parseInt(this.lines);
    }
    return this.lines;
  }
}

window.customElements.define(TextTruncate.is, TextTruncate);
