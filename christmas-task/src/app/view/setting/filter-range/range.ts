import Control from "../../../../common/control";
import style from '../setting-style.css';

export default class Range extends Control{
  onChangeRange: (from:number, to:number)=>void;
  range1: Control<HTMLInputElement>;
  range2: Control<HTMLInputElement>;
  span1: Control<HTMLSpanElement>;
  span2: Control<HTMLSpanElement>;
  rangeWrap: Control<HTMLElement>;
  rangeBar: Control<HTMLElement>;
  
  constructor(parentNode: HTMLElement, name: string, start:string, finish:string, step:string) {
    super(parentNode);
    const title = new Control(this.node, 'h4', style['range-title'], name);
    const rangeContainer = new Control(this.node, 'div', style['range-container']);

    this.span1 = new Control<HTMLSpanElement>(rangeContainer.node, 'span', style['range-span']);
    this.rangeWrap = new Control(rangeContainer.node, 'div', style["range-wrap"]);
    this.span2 = new Control<HTMLSpanElement>(rangeContainer.node, 'span', style['range-span']);
    this.rangeBar = new Control(this.rangeWrap.node, 'div', style['range-bar']);
    
    this.range1 = new Control<HTMLInputElement>(this.rangeWrap.node, 'input');
    this.range1.node.type = 'range';
    this.range1.node.min = start;
    this.range1.node.max = finish;
    this.range1.node.step = step;
    
    this.range2 = new Control<HTMLInputElement>(this.rangeWrap.node, 'input');
    this.range2.node.type = 'range';
    this.range2.node.min = start;
    this.range2.node.max = finish;
    this.range2.node.step = step;
    this.range1.node.oninput = () => {
      if (+this.range1.node.value > +this.range2.node.value) {
        this.range1.node.value = this.range2.node.value;        
      }
      this.onChangeRange(+this.range1.node.value , +this.range2.node.value);
    }

    this.range2.node.oninput = () => {
      if (+this.range2.node.value < +this.range1.node.value) {
        this.range2.node.value = this.range1.node.value;        
      }
      this.onChangeRange(+this.range1.node.value , +this.range2.node.value);
    }
  }
  update(values:Array<number>) {
    this.range1.node.value = values[0].toString();
    this.span1.node.textContent = values[0].toString();
    this.range2.node.value = values[1].toString();
    this.span2.node.textContent = values[1].toString();

    const wrapValue = Number(this.range1.node.max) - Number(this.range1.node.min);
    const range1Value = values[0] - Number(this.range1.node.min);
    const range2Value = values[1] - Number(this.range2.node.min);

    this.rangeBar.node.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${100 / wrapValue * range1Value}%, #fff08e ${ 100 / wrapValue * range1Value}%, #fff08e ${100 / wrapValue * range2Value}%,#fff ${100 / wrapValue * range2Value}%, #fff 100% )`;
     
  }
}