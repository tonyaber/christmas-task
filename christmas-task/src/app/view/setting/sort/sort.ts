import Control from '../../../../common/control';
import Select from './select';
import ResetFilters from './reset-filters';
import style from '../setting-style.css';
import ModelFilter from '../../../model/model-filter';

export default class Sort extends Control {
  select: Select;
  constructor(parentNode: HTMLElement, model: ModelFilter) {
    super(parentNode, 'div', style['sort']);
    model.onUpdate.add(
      () => {
        this.update(model);
      }
    );

    const title = new Control(this.node, 'h3', '', 'Sort');
    this.select = new Select(this.node);
    this.select.onChangeSort = (value) => {
      model.changeSort(value);
    }

    const resetBtn = new ResetFilters(this.node);
    resetBtn.onResetFilters = () => {
      model.resetFilters();
    }
    this.update(model);
  }

  update(model: ModelFilter) {
    const value = model.sort;
    this.select.update(value);
  }
}