import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import style from './toys.css'

export default class ToyItem extends Control{
  title: Control<HTMLHeadingElement>;
  img: Control<HTMLImageElement>;
  description: Control<HTMLElement>;
  count: Control<HTMLElement>;
  year: Control<HTMLElement>;
  star: Control<HTMLImageElement>;
  formWrap: Control<HTMLElement>;
  colorWrap: Control<HTMLElement>;
  sizeWrap: Control<HTMLElement>;
  favoriteWrap: Control<HTMLElement>
  onSelectToy: () => void;  

  
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
    const form = new Control(this.description.node, 'span', '', 'Form: ');
    this.formWrap = new Control(this.description.node, 'span');
    const br = new Control(this.description.node, 'br');
    const color = new Control(this.description.node, 'span', '', 'Color: ');
    this.colorWrap = new Control(this.description.node, 'span',)
    const br3 = new Control(this.description.node, 'br');
    const size = new Control(this.description.node, 'span', '', 'Size: ');
    this.sizeWrap = new Control(this.description.node, 'span');
    const br2 = new Control(this.description.node, 'br');
    const favorite = new Control(this.description.node, 'span', '', 'Favorite: ');
    this.favoriteWrap = new Control(this.description.node, 'span')
    this.node.onclick = () => {
      this.onSelectToy();
    }
  }

  update(toy: IToy) {  
    this.title.node.textContent = toy.name;
    this.img.node.src = `assets/toys/${toy.num}.png`;
    this.count.node.textContent = `Count: ${toy.count}`
    this.year.node.textContent = `Year: ${toy.year}`

    this.formWrap.node.removeAttribute('class');
    this.formWrap.node.classList.add(style['form-wrap'],style[toy.shape]);
   
    this.colorWrap.node.removeAttribute('class');
    this.colorWrap.node.classList.add(style['color-wrap'],style[toy.color]);
    
    this.sizeWrap.node.removeAttribute('class');
    this.sizeWrap.node.classList.add(style['size-wrap'], style[toy.size]);
    this.favoriteWrap.node.removeAttribute('class');
    this.favoriteWrap.node.classList.add(style['favorite-wrap'],
          toy.favorite ? style['favorite-true'] : style['favorite-false']);
    if (toy.isSelected) {
      this.star.node.classList.add(style.selected);
    } else {
      this.star.node.classList.remove(style.selected);
    }
  }
  animateIn() {
    return new Promise(resolve => {
      this.node.ontransitionend = () => {
        resolve(null);
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.node.classList.remove(style.hide)
          this.node.classList.add(style.show);
        })
      })
    });     
  }

  animateOut() {
    return new Promise(resolve => {
      this.node.classList.remove(style.show)
      this.node.classList.add(style.hide);
      this.node.ontransitionend = () => {
        resolve(null);
      }
    });  
  }

  animateUpdate() {
    return new Promise(resolve => {
      this.node.classList.remove(style.show)
      this.node.classList.add(style.hide);
      this.node.ontransitionend = () => {
        resolve(null);
        this.node.classList.remove(style.hide)
        this.node.classList.add(style.show);
      }
    });
  }

  
}
