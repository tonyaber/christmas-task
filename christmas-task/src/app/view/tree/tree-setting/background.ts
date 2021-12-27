import Control from '../../../../common/control';
import style from './tree-setting.css';

export default class Background extends Control {
  onChangeBackground: () => void;
  constructor(parentNode: HTMLElement, index:number) {
    super(parentNode,'div', style.background);
    this.node.style.backgroundImage = `url(assets/bg/${index}.jpg)`;
    this.node.onclick = () => {
      this.onChangeBackground();
    }
  }
}