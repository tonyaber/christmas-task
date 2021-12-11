import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from '../checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Form extends Control {
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['color']);
    const name = new Control(this.node, 'h4', style.name, 'Color:');

    const filters = model.getFilters();
    const values = Object.keys(filters.color);
    
    values.forEach(item => {
      const checkbox = new Checkbox(this.node, style[item]);
      checkbox.onChangeFilter = (isChecked)=> {
        model.changeData(item, 'color', isChecked)
      }
    })
    // const name = new Control(this.node, 'h4', style.name, 'Color:');
    // const white = new Checkbox(this.node, 'white');
    // const yellow = new Checkbox(this.node, 'yellow');
    // const red = new Checkbox(this.node, 'red');
    // const blue = new Checkbox(this.node, 'blue');
    // const green = new Checkbox(this.node, 'green');
  }
}