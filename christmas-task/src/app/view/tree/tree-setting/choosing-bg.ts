import Control from '../../../../common/control';
import ModelTree from '../../../model/model-tree';
import Background from './background';
import style from './tree-setting.css';

export default class ChoosingBg extends Control {
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode, 'div', style['choosing-bg']);
    const title = new Control(this.node, 'h3', '', 'Choose a background');
    const backgroundContainer = new Control(this.node, 'div', style['background-container']);
    for (let i = 1; i <= 10; i++){
      const background = new Background(backgroundContainer.node, i);
      background.onChangeBackground = () => {
        model.setBg(i);
      }
    }
  }
}