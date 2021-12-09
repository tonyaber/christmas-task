import Control from '../../../../common/control';
import style from '../setting-style.css';
import Form from './form'; 
import Color from './color';

export default class FilterValue extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['filter-value']);
    const title = new Control(this.node, 'h3', '', 'FILTERS BY VALUE');
    const form = new Form(this.node);
    const color = new Color(this.node);
  }
}