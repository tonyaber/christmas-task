import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from './checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Shape extends Control {
  model: ModelFilter;
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['shape']);
    this.model = model;
    const name = new Control(this.node, 'h4', style.name, 'Form:');
    
    const filters = model.getFilters();
    const values = Object.keys(filters.shape);
    
    values.forEach(item => {
      const checkbox = new Checkbox(this.node, style[item]);
      checkbox.onChangeFilter = (isChecked)=> {
        this.model.changeData(item, 'shape', isChecked)//isChecked
      }
    })
  }
}