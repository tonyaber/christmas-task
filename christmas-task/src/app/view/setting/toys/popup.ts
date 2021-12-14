import Control from "../../../../common/control";
import style from './toys.css'

export default class Popup extends Control{
  onDeletePopup: ()=>void;
  constructor(parentNode:HTMLElement, text:string) {
    super(parentNode, 'div', style['popup-container']);
    const container = new Control(this.node, 'div', style.popup, text);
    const delBtn = new Control(container.node, 'button', style['popup-btn'], '✖');
    delBtn.node.onclick = () => {
      this.onDeletePopup();
    }
    this.node.onclick = (e) => {
      if (e.target === this.node) {
        this.onDeletePopup();
      }
      
    }
  }
}