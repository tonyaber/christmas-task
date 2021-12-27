import Control from '../../../../common/control';
import style from './tree-setting.css';

export default class TreeIcon extends Control {
  onChangeTree: () => void;
  constructor(parentNode: HTMLElement, index:number) {
    super(parentNode,'div', style['tree-icon']);
    this.node.style.backgroundImage = `url(assets/tree/${index}.png)`;
    this.node.onclick = () => {
      this.onChangeTree();
    }
  }
}