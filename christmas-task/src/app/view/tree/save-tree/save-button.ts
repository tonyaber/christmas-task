import Control from '../../../../common/control';
import style from './card.css';
export default class SaveButton extends Control{
  onSaveHandler: ()=>void;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const button = new Control(this.node, 'button', style['save-btn'], 'Save tree');
    button.node.onclick = () => {
      this.onSaveHandler();
    }
  }
}