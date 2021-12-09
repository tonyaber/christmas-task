import Control from "../../../common/control";
import style from './setting-style.css';

export default class CheckBox extends Control{
  onChangeFilter: (name: string)=>void;
  
  constructor(parentNode: HTMLElement, name: string) {
    super(parentNode, 'label');
    const checkBox = new Control<HTMLInputElement>(this.node, 'input');
    checkBox.node.type = 'checkbox';
    checkBox.node.onchange = () => {
       this.onChangeFilter(name);
    }
    const span = new Control(this.node, 'span',  style[name]);
  }
}