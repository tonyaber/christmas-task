import Control from "../../../../common/control";
import style from '../setting-style.css'

export default class Popup extends Control{
  onDeletePopup: ()=>void;
  constructor(parentNode:HTMLElement, text:string) {
    super(parentNode, 'div', style.popup, text);
    const delBtn = new Control(this.node, 'button', '', 'delete');
    delBtn.node.onclick = () => {
      this.onDeletePopup();
    }
  }
}