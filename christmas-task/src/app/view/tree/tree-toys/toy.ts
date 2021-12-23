import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import style from './toys-list.css';

export default class Toy extends Control {
  countContainer: Control<HTMLElement>;
  toy: Control<HTMLImageElement>;
  constructor(parentNode: HTMLElement, data: IToy) { 
    super(parentNode, 'div', style.toy);
    let count = data.count;
    this.toy = new Control<HTMLImageElement>(this.node, 'img', style['toy-img']);
    this.toy.node.src = `../../../assets/toys/${data.num}.png`;
    this.toy.node.ondragstart = (e) => {
      e.dataTransfer.effectAllowed = "move";
      //this.toy.node.style.left = e.offsetX - this.toy.node.offsetWidth / 2 + 'px';
      e.dataTransfer.setData('id', data.num);
    }
    this.countContainer = new Control(this.node, 'div', style.count, count.toString());
  }

  update(value: number) {
    if (value > 0) {
      this.countContainer.node.textContent = value.toString();
    } else {
      this.toy.destroy();
      this.countContainer.destroy();
    }
    
  }
}