import Control from '../../../../common/control';
import style from './tree-setting.css';
import CheckBox from '../../setting/filter-value/checkbox'
import ChoosingBg from './choosing-bg';
import ChoosingTree from './choosing-tree';
import ChoosingGarland from './choosing-garland';
import ModelTree from '../../../model/model-tree';

export default class Setting extends Control{
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode,'div', style.setting);
    const soundContainer = new Control(this.node, 'div', style['sound-container']);
    const sound = new CheckBox(soundContainer.node, style.sound);
    sound.onChangeFilter =()=> {
      console.log('sound')
    }
    const snow = new CheckBox(soundContainer.node, style.snow);
    snow.onChangeFilter = () => {
      console.log('snow');
    }
    const choosingBg = new ChoosingBg(this.node, model);
    const choosingTree = new ChoosingTree(this.node, model);
    const choosingGarland = new ChoosingGarland(this.node);

  }

}