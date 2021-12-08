import Control from '../../../../common/control';
import style from '../setting-style.css';

export default class FilterRange extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['filter-range']);
    const title = new Control(this.node, 'h3', '', 'FILTERS BY RANGE');

  }
}