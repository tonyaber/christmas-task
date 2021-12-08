import Control from '../../../common/control';
import style from './setting-style.css';

export default class SettingPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', style.main);
    const setting = new Control(this.node, 'div', 'setting');

    const toys = new Control(this.node, 'div', 'toys');
  }
}