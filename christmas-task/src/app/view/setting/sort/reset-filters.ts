import Control from "../../../../common/control";
import style from './sort.css';

export default class ResetFilters extends Control {
  onReset: ()=>void;
  
  constructor(parentNode: HTMLElement, name:string) {
    super(parentNode);
    const btn = new Control(this.node, 'button', style['resetBtn'],name);
    btn.node.onclick = ()=>{
      this.onReset();
    }
  }
}