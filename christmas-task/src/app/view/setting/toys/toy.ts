import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import style from './toys.css'

export default class ToyItem extends Control{
  title: Control<HTMLHeadingElement>;
  img: Control<HTMLImageElement>;
  description: Control<HTMLElement>;
  count: Control<HTMLElement>;
  year: Control<HTMLElement>;
  form: Control<HTMLElement>;
  color: Control<HTMLElement>;
  size: Control<HTMLElement>;
  favorite: Control<HTMLElement>;
  onSelectToy: ()=>void;
  star: Control<HTMLImageElement>;
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['toy-item']);
    this.title = new Control(this.node, 'h3', style.title);
    const containerImg = new Control(this.node, 'div', style['container-image']);
    this.img = new Control(containerImg.node, 'img', style['toy-img']);
    this.star = new Control(containerImg.node, 'img', style['toy-star']);
    this.star.node.src = 'assets/svg/star.svg'
    this.description = new Control(this.node, 'div');
    this.count = new Control(this.description.node, 'p')
    this.year = new Control(this.description.node, 'p');
    this.form = new Control(this.description.node, 'p');
    this.color = new Control(this.description.node, 'p');
    this.size = new Control(this.description.node, 'p');
    this.favorite = new Control(this.description.node, 'p');
    this.node.onclick = () => {
      this.onSelectToy();
    }
  }

  update(toy: IToy) {
    this.title.node.textContent = toy.name;
    this.img.node.src = `assets/toys/${toy.num}.png`;
    this.count.node.textContent = `Count: ${toy.count}`
    this.year.node.textContent = `Year: ${toy.year}`
    this.form.node.textContent = `Form: ${toy.shape}`
    this.color.node.textContent = `Color: ${toy.color}`
    this.size.node.textContent = `Size: ${toy.size}`
    this.favorite.node.textContent = `Favorite: ${toy.favorite ? 'Yes' : 'No'}`;
    
    if (toy.isSelected) {
      this.star.node.classList.add(style.selected);
    } else {
      this.star.node.classList.remove(style.selected);
    }
  }
}
