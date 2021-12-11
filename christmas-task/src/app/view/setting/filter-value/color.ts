import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from './checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Form extends Control {
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['color']);
    const name = new Control(this.node, 'h4', style.name, 'Color:');

    const values = Object.keys(model.getFilters().color);
    
    values.forEach(item => {
      const checkbox = new Checkbox(this.node, style[item]);
      checkbox.onChangeFilter = (isChecked)=> {
        model.changeData(item, 'color', isChecked)
      }
    })
  }
}