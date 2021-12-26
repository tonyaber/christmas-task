import Control from '../../../../common/control';
import style from './tree-setting.css';
import CheckBox from '../../setting/filter-value/checkbox'
import ChoosingBg from './choosing-bg';
import ChoosingTree from './choosing-tree';
import ChoosingGarland from './choosing-garland';
import ModelTree from '../../../model/model-tree';


export default class Setting extends Control{
  snow: CheckBox;
  sound: CheckBox;
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode,'div', style.setting);
    const soundContainer = new Control(this.node, 'div', style['sound-container']);
    this.sound = new CheckBox(soundContainer.node, style.sound);
    this.sound.onChangeFilter =(isChecked)=> {
      model.setMusic(isChecked);
    }
    this.snow = new CheckBox(soundContainer.node, style.snow);
    this.snow.onChangeFilter = (isChecked) => {
      model.setSnow(isChecked);
    }
    const choosingBg = new ChoosingBg(this.node, model);
    const choosingTree = new ChoosingTree(this.node, model);
    const choosingGarland = new ChoosingGarland(this.node, model);
    this.update(model);
  }

  update(model:ModelTree) {
    this.snow.update(model.isSnow);
    this.sound.update(model.isMusic);
  }

}