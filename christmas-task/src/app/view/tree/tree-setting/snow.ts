import Control from '../../../../common/control';
import style from './tree-setting.css';

export default class SnowIcon extends Control{
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const snow = new Control<HTMLImageElement>(this.node, 'img', style.snow);
    snow.node.src = '../../../../assets/svg/snowflake.svg';
  }

}