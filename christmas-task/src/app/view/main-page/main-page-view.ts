import Control from '../../../common/control';
import ModelToys from '../../model/model-toys';
import style from './main-style.css';
import  Page  from '../../page';
console.log(Page)
export default class MainPage extends Page {
  onStartButtonClick: () => void;

  constructor(parentNode: HTMLElement, model: ModelToys) {    
    super(parentNode, style.main);    
    
    this.node.classList.add(style.snow)
    
    const title = new Control(this.node, 'div', style.title);
    const titleContent = new Control(title.node, 'h2', '', 'New Years game \n "Dress up the tree"');

    const startBtn = new Control<HTMLAnchorElement>(this.node, 'a', style['btn-start'], 'Start game');
    startBtn.node.href = '#setting';    
  }

  // animateIn() {
  //   return new Promise(resolve => {
  //     this.node.ontransitionend = () => {
  //       resolve(null);
  //     }
  //     requestAnimationFrame(() => {
  //       requestAnimationFrame(() => {
  //         this.node.classList.remove(style.hide);
  //         this.node.classList.add(style.show)
  //       })
  //     })      
  //   })    
  // }

  // animateOut() {
  //   return new Promise(resolve => {
  //     this.node.classList.remove(style.show)
  //     this.node.classList.add(style.hide)
  //     this.node.ontransitionend = () => {
  //       resolve(null);
  //     }
  //   });
  // }  
}