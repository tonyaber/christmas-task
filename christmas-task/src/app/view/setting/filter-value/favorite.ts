import Control from '../../../../common/control';
import style from './filter-values.css';
import Checkbox from './checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Favorite extends Control {
  checkbox: Checkbox;
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['favorite-container']);
    model.onUpdate.add(
      () => {
        this.update(model);
      }
    );
    const name = new Control(this.node, 'h4', style.name, 'Favorite:');
    const value = model.getFilters().favorite.favorite
    this.checkbox = new Checkbox(this.node, style.favorite);
    this.checkbox.onChangeFilter = (isChecked)=> {
      model.changeData('favorite', 'favorite', isChecked)
    }
    this.update(model);
  }
  update(model: ModelFilter) {
    const isChecked = model.getFilters().favorite.favorite;
    this.checkbox.update(isChecked);
    
  }
}