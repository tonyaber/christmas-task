import Control from '../../../../common/control';
import style from '../setting-style.css';

export default class Sort extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['sort']);
    const title = new Control(this.node, 'h3', '', 'Sort');

  }
}