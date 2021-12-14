import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from './checkbox';
import ModelFilter from '../../../model/model-filter';

export default class Shape extends Control {
  data: Record<string, Checkbox>[] =[];
  
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['shape']);
    
    model.onUpdate.add(
      () => {
        this.update(model);
      }
    );
    
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
}