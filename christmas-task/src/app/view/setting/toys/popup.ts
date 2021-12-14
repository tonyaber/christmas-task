import Control from "../../../../common/control";
import style from '../setting-style.css'

export default class Popup extends Control{
  onDeletePopup: ()=>void;
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', style.popup, 'Sorry, all slots are full');
    const delBtn = new Control(this.node, 'button', '', 'delete');
    delBtn.node.onclick = () => {
      this.onDeletePopup();
    }
  }
}