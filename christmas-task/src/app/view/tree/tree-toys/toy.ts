import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import style from './toys-list.css';

export default class Toy extends Control {
  countContainer: Control<HTMLElement>;
  toy: Control<HTMLImageElement>;
  isEmpty: boolean = false;
  constructor(parentNode: HTMLElement, data: IToy) { 
    super(parentNode, 'div', style.toy);
    let count = data.count;
    
    this.toy = new Control<HTMLImageElement>(this.node, 'img', style['toy-img']);
    this.toy.node.src = `../../../assets/toys/${data.num}.png`;
    this.toy.node.ondragstart = (e) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData('id', data.num);
    }
    this.countContainer = new Control(this.node, 'div', style.count, count.toString());
  }

  update(value: number) {
    if (value === 0) {
      this.isEmpty = true;
      this.toy.node.classList.add(style.hide);
      this.countContainer.node.classList.add(style.hide);
    }else if (this.isEmpty) {
      this.isEmpty = false;
      this.countContainer.node.textContent = value.toString();
      this.toy.node.classList.remove(style.hide);
      this.countContainer.node.classList.remove(style.hide);
    }else if (value > 0) {
      this.countContainer.node.textContent = value.toString();
    }    
  }
}