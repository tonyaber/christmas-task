import Control from '../common/control';
import style from './app.css';

export default class Page extends Control{
constructor(parentNode: HTMLElement, mainStyle:string) {
  super(parentNode, 'div', mainStyle); 
    this.node.classList.add(style.hide);
  }

  animateIn() {
    return new Promise(resolve => {
      this.node.ontransitionend = (e) => {
        if (e.target === this.node) {
          resolve(null);
        }        
      }
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {        
          this.node.classList.remove(style.hide);
          this.node.classList.add(style.show)
        })
      })      
    })    
  }

  animateOut() {
    return new Promise(resolve => {
      this.node.classList.remove(style.show)
      this.node.classList.add(style.hide)
      this.node.ontransitionend = (e) => {
        if (e.target === this.node) {
          resolve(null);
        } 
      }
      // this.node.onanimationend = (e) => {
      //   if (e.target === this.node) {
      //     resolve(null);
      //   } 
      // }
    });
  }  
}