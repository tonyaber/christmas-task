import Control from '../../../../common/control';
import style from '../setting-style.css';

export default class Form extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['form']);
    const name = new Control(this.node, 'h4', style.name, 'Form:');
    const round = new Control(this.node, 'button', style.round);
    const bell = new Control(this.node, 'button', style.bell);
    const cone = new Control(this.node, 'button', style.cone);
    const snowflake = new Control(this.node, 'button', style.snowflake);
    const figurine = new Control(this.node, 'button', style.figurine);
  }
}