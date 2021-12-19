import Control from '../../../../common/control';
import style from './tree-setting.css';

export default class ChoosingBg extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['choosing-bg']);
    const title = new Control(this.node, 'h3', '','Choose a background')
  }
}