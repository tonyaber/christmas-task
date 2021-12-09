import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import style from '../setting-style.css'

export default class ToyItem extends Control{
  constructor(parentNode: HTMLElement, toy:IToy) {
    super(parentNode, 'div', style['toy-item']);
    const title = new Control(this.node, 'h4', '', toy.name);
    const img = new Control<HTMLImageElement>(this.node, 'img', style['toy-img']);
    img.node.src = `assets/toys/${toy.num}.png`;
    const description = new Control(this.node, 'div');
    const count = new Control(description.node, 'p', '', `Count: ${toy.count}`)
    const year = new Control(description.node, 'p', '', `Year: ${toy.year}`);
    const form = new Control(description.node, 'p', '', `Form: ${toy.shape}`);
    const color = new Control(description.node, 'p', '', `Color: ${toy.color}`);
    const size = new Control(description.node, 'p', '', `Size: ${toy.size}`);
  }
}
