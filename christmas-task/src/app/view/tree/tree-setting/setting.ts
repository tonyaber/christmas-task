import Control from '../../../../common/control';
import Sound from './sound';
import SnowIcon from './snow';
import style from './tree-setting.css';
import CheckBox from '../../setting/filter-value/checkbox'

export default class Setting extends Control{
  constructor(parentNode: HTMLElement) {
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
  }

}