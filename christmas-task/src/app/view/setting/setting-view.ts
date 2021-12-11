import Control from '../../../common/control';
import style from './setting-style.css';
import FilterValue from './filter-value/filter-value';
import FilterRange from './filter-range/filter-range';
import Sort from './sort/sort';
import ModelToys from '../../model/model-toys';
import ToysList from './toys/toys-list';

export default class SettingPage extends Control {
  model: ModelToys;

  constructor(parentNode: HTMLElement, model:ModelToys) {
    super(parentNode, 'main', style.main);
    this.model = model;

    const setting = new Control(this.node, 'div', style.setting);

    const filterValue = new FilterValue(setting.node, this.model.modelFilter);
    const filterRange = new FilterRange(setting.node, this.model.modelFilter);

    const sort = new Sort(setting.node);

    const toys = new ToysList(this.node, this.model.modelSort);
  }
}