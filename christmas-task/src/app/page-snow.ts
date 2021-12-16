import Control from '../common/control';
import style from './app.css';

export default class PageSnow extends Control{
  constructor(parentNode: HTMLElement) {
    super(parentNode);    
    this.node.classList.add(style.snow, style['page-snow']);
  }
  showSnow() {
    this.node.classList.remove(style['hide-snow'])
  }
  hideSnow() {
    this.node.classList.add(style['hide-snow'])
  }

}