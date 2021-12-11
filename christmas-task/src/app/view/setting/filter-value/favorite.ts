import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from './checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Favorite extends Control {
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['favorite-container']);
    const name = new Control(this.node, 'h4', style.name, 'Favorite:');

    const checkbox = new Checkbox(this.node, style.favorite);
    checkbox.onChangeFilter = (isChecked)=> {
      model.changeData('favorite', 'favorite', isChecked)
    }
  }
}