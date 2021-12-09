import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from '../checkbox';
import ModelToys from '../../../model/model-toys';

export default class Shape extends Control {
  model: ModelToys;
  constructor(parentNode: HTMLElement, model:ModelToys) {
    super(parentNode, 'div', style['shape']);
    this.model = model;
    const name = new Control(this.node, 'h4', style.name, 'Form:');
    
    const filters = model.getFilters();
    const values = Object.keys(filters.shape);
    values.forEach(item => {
      const checkbox = new Checkbox(this.node, item);
      checkbox.onChangeFilter = (checkBoxName)=> {
        this.model.changeDate(checkBoxName, 'shape')
      }
    })
  }
}