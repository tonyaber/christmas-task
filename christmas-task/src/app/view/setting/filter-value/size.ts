import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from '../checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Size extends Control {
  model: ModelFilter;
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['size']);
    this.model = model;
    const name = new Control(this.node, 'h4', style.name, 'Size:');
    
    const filters = model.getFilters();
    const values = Object.keys(filters.size);
    
    values.forEach(item => {
      const checkbox = new Checkbox(this.node, style[item]);
      checkbox.onChangeFilter = (isChecked)=> {
        this.model.changeData(item, 'size', isChecked)
      }
    })
  }
}