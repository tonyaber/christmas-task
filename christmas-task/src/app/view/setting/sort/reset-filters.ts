import Control from "../../../../common/control";


export default class ResetFilters extends Control {
  onResetFilters: ()=>void;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const btn = new Control(this.node, 'button', '','Reset filters');
    btn.node.onclick = ()=>{
      this.onResetFilters();
    }
  }
}