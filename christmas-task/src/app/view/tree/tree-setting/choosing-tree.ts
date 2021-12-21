import Control from '../../../../common/control';
import style from './tree-setting.css';
import TreeIcon from './tree-icon';
import ModelTree from '../../../model/model-tree';
export default class ChoosingTree extends Control {
  constructor(parentNode: HTMLElement, model:ModelTree) {
    super(parentNode, 'div', style['choosing-tree']);
    const title = new Control(this.node, 'h3', '', 'Choose a tree')
     const treeContainer = new Control(this.node, 'div', style['tree-icon-container']);
    for (let i = 1; i <= 6; i++){
      const tree = new TreeIcon(treeContainer.node, i);
      tree.onChangeTree = () => {
        model.setTree(i);
      }
    }
  }
}