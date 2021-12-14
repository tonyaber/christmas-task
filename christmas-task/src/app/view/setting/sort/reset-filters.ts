import Control from "../../../../common/control";
import style from './sort.css';

export default class ResetFilters extends Control {
  onResetFilters: ()=>void;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const btn = new Control(this.node, 'button', style['resetBtn'],'Reset filters');
    btn.node.onclick = ()=>{
      this.onResetFilters();
    }
  }
}