import Control from "../../../../common/control";
import style from '../setting-style.css';

export default class Range extends Control{
  onChangeRange: (from:number, to:number)=>void;
  
  constructor(parentNode: HTMLElement, name: string, start:string, finish:string, step:string, value1:string, value2:string) {
    super(parentNode);
    const title = new Control(this.node, 'h4', '', name);
    const rangeContainer = new Control(this.node, 'div', style['range-container']);
    const span1 = new Control<HTMLSpanElement>(rangeContainer.node, 'span', '', value1);
    const rangeWrap = new Control(rangeContainer.node, 'div', style["range-wrap"]);
    const span2 = new Control<HTMLSpanElement>(rangeContainer.node, 'span', '', value2);
    const rangeBar = new Control(rangeWrap.node, 'div', style['range-bar']);
    const range1 = new Control<HTMLInputElement>(rangeWrap.node, 'input');
    range1.node.type = 'range';
    range1.node.min = start;
    range1.node.max = finish;
    range1.node.value = value1;
    range1.node.step = step;
    
    const range2 = new Control<HTMLInputElement>(rangeWrap.node, 'input');
    range2.node.type = 'range';
    range2.node.min = start;
    range2.node.max = finish;
    range2.node.value =value2;
    range2.node.step = step;
    range1.node.oninput = () => {
      if (+range1.node.value > +range2.node.value) {
        range1.node.value = range2.node.value;        
      }
      span1.node.textContent = range1.node.value;
      this.onChangeRange(+range1.node.value , +range2.node.value);
    }
    range2.node.oninput = () => {
      if (+range2.node.value < +range1.node.value) {
        range2.node.value = range1.node.value;        
      }
      span2.node.textContent = range2.node.value;
      this.onChangeRange(+range1.node.value , +range2.node.value);
    }
    // checkBox.node.onchange = () => {
    //    this.onChangeFilter(checkBox.node.checked);
    // }
    //const span = new Control(this.node, 'span', className);
  }
}