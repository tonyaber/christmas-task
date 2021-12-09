import Control from "../../../common/control";
import style from './setting-style.css';

export default class CheckBox extends Control{
  constructor(parentNode: HTMLElement, name: string) {
    super(parentNode, 'label');
    const checkBox = new Control<HTMLInputElement>(this.node, 'input');
    checkBox.node.type = 'checkbox';
    const span = new Control(this.node, 'span',  style[name]);
  }
}