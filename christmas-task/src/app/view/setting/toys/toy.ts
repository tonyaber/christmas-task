import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import style from '../setting-style.css'

export default class ToyItem extends Control{
  title: Control<HTMLHeadingElement>;
  img: Control<HTMLImageElement>;
  description: Control<HTMLElement>;
  count: Control<HTMLElement>;
  year: Control<HTMLElement>;
  form: Control<HTMLElement>;
  color: Control<HTMLElement>;
  size: Control<HTMLElement>;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['toy-item']);
    this.title = new Control<HTMLHeadingElement>(this.node, 'h4',);
    this.img = new Control<HTMLImageElement>(this.node, 'img', style['toy-img']);
    this.description = new Control(this.node, 'div');
    this.count = new Control(this.description.node, 'p')
    this.year = new Control(this.description.node, 'p');
    this.form = new Control(this.description.node, 'p');
    this.color = new Control(this.description.node, 'p');
    this.size = new Control(this.description.node, 'p');
  }

  update(toy: IToy) {
    this.title.node.textContent = toy.name;
    this.img.node.src = `assets/toys/${toy.num}.png`;
    this.count.node.textContent = `Count: ${toy.count}`
    this.year.node.textContent = `Year: ${toy.year}`
    this.form.node.textContent = `Form: ${toy.shape}`
    this.color.node.textContent = `Color: ${toy.color}`
    this.size.node.textContent = `Size: ${toy.size}`
  }
}
