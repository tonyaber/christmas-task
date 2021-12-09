import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from '../checkbox';

export default class Form extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['form']);
    const name = new Control(this.node, 'h4', style.name, 'Form:');
    const round = new Checkbox(this.node, 'round');
    const bell = new Checkbox(this.node, 'bell');
    const cone = new Checkbox(this.node, 'cone');
    const snowflake = new Checkbox(this.node, 'snowflake');
    const figurine = new Checkbox(this.node, 'figurine');
  }
}