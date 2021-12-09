import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from '../checkbox';
import ModelToys from '../../../model/model-toys';

export default class Form extends Control {
  constructor(parentNode: HTMLElement, model:ModelToys) {
    super(parentNode, 'div', style['color']);
    const name = new Control(this.node, 'h4', style.name, 'Color:');
    const filters = model.getFilters();
    const values = Object.keys(filters.color);
    values.forEach(item => {
      const checkbox = new Checkbox(this.node, item);
      checkbox.onChangeFilter = (checkBoxName)=> {
        model.changeDate(checkBoxName, 'color')
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