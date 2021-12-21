import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import style from './toys-list.css';

export default class Toy extends Control {
  constructor(parentNode: HTMLElement, data: IToy) { 
    super(parentNode, 'div', style.toy);
    const toy = new Control<HTMLImageElement>(this.node, 'img', style['toy-img']);
    toy.node.src = `../../../assets/toys/${data.num}.png`;
    const count = new Control(this.node, 'div', style.count, data.count.toString());
  }
}