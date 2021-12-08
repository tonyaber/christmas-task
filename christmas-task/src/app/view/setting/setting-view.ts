import Control from '../../../common/control';
import style from './setting-style.css';
import FilterValue from './filter-value/filter-value';
import FilterRange from './filter-range/filter-range';
import Sort from './sort/sort';

export default class SettingPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', style.main);
    const setting = new Control(this.node, 'div', style.setting);

    const filterValue = new FilterValue(setting.node);
    const filterRange = new FilterRange(setting.node);
    const sort = new Sort(setting.node);

    const toys = new Control(this.node, 'div', 'toys');
  }
}