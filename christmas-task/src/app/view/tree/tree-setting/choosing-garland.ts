import Control from '../../../../common/control';
import style from './tree-setting.css';
import CheckBox from '../../setting/filter-value/checkbox';
import ModelTree from '../../../model/model-tree';

export default class ChoosingGarland extends Control {
  constructor(parentNode: HTMLElement, model:ModelTree) {
    super(parentNode, 'div', style['choosing-garland']);
    const title = new Control(this.node, 'h3', '', 'Choose a garland');
    const garlands = ['red', 'blue', 'yellow', 'white', 'violet', 'multicolored', 'off'];

    const garlandContainer = new Control(this.node, 'div', style['garland-container']);
    garlands.map(item => {
      const garland = new CheckBox(garlandContainer.node, style[item]);
      garland.onChangeFilter = () => {
        model.setGarland(item)
      }
    })
  }
}