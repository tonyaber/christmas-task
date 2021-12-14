import Control from '../../../common/control';
import style from './setting-style.css';
import FilterValue from './filter-value/filter-value';
import FilterRange from './filter-range/filter-range';
import Sort from './sort/sort';
import ModelToys from '../../model/model-toys';
import ToysList from './toys/toys-list';

export default class SettingPage extends Control {
   constructor(parentNode: HTMLElement, model:ModelToys) {
    super(parentNode, 'main', style.main);
   
    const setting = new Control(this.node, 'div', style.setting);

    const filterValue = new FilterValue(setting.node, model.modelFilter);
    const filterRange = new FilterRange(setting.node, model.modelFilter);
    const sort = new Sort(setting.node, model.modelFilter);

    const toys = new ToysList(this.node, model.modelSort);
  }
}

