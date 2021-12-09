import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from '../checkbox';

export default class Form extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['color']);
    const name = new Control(this.node, 'h4', style.name, 'Color:');
    const white = new Checkbox(this.node, 'white');
    const yellow = new Checkbox(this.node, 'yellow');
    const red = new Checkbox(this.node, 'red');
    const blue = new Checkbox(this.node, 'blue');
    const green = new Checkbox(this.node, 'green');
  }
}