import Control from '../../../../common/control';
import Select from './select';
import style from '../setting-style.css';
import ModelFilter from '../../../model/model-filter';

export default class Sort extends Control {
  constructor(parentNode: HTMLElement, model: ModelFilter) {
    super(parentNode, 'div', style['sort']);
    const title = new Control(this.node, 'h3', '', 'Sort');
    const select = new Select(this.node);
    select.onChangeSort = (value) => {
      model.changeSort(value);
    }
  }
}