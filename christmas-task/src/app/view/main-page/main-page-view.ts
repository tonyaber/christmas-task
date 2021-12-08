import Control from '../../../common/control';
import style from './main-style.css';

export default class MainPage extends Control {
  onStartButtonClick: () => void;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', style.main);
    const title = new Control(this.node, 'div', style.title);
    const titleContent = new Control(title.node, 'h2', '', 'New Years game \n "Dress up the tree"');
    const startBtn = new Control(this.node, 'button', style['btn-start'], 'Start game');
    startBtn.node.onclick = ()=>this.onStartButtonClick();
  }
}