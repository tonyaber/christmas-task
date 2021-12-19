import Control from '../../../../common/control';
import style from './tree-setting.css';

export default class Sound extends Control{
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const sound = new Control<HTMLImageElement>(this.node, 'img', style.sound);
    sound.node.src = '../../../../assets/svg/audio.svg';
  }

}