import Control from '../../../../common/control';
import style from './tree-setting.css';

export default class ChoosingGarland extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['choosing-garland']);
    const title = new Control(this.node, 'h3', '','Choose a garland')
  }
}