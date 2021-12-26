import Control from '../../../../common/control';

export default class SaveButton extends Control{
  onSaveHandler: ()=>void;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const button = new Control(this.node, 'button', '', 'Save tree');
    button.node.onclick = () => {
      this.onSaveHandler();
    }
  }
}