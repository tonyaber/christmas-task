import Control from '../../../../common/control';
import style from './filter-values.css';
import Checkbox from './checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Shape extends Control {
  data: Record<string, Checkbox>[] =[];
  updateHandler: () => void;
  model: ModelFilter;
  
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['shape']);
    this.updateHandler = () => this.update(model);
    this.model.onUpdate.add(this.updateHandler);
    
    const name = new Control(this.node, 'h4', style.name, 'Form:');    
    const values = model.getFilters().shape;
    
    Object.keys(values).map(item => {
     const checkbox = new Checkbox(this.node, style[item]);
      checkbox.onChangeFilter = (isChecked) => {
        model.changeData(item, 'shape', isChecked)
      }
      this.data.push({[item]: checkbox});
    }) 

    this.update(model);
  }
  update(model: ModelFilter) {
    const values = model.getFilters().shape;
    this.data.forEach((item) => {
      Object.keys(item).map(it => [
        item[it].update(values[it])
      ]);      
    })
  }
   destroy() {
    this.model.onUpdate.remove(this.updateHandler);
    super.destroy();
  }
}