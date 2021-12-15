import Control from '../../../../common/control';
import style from './filter-range.css';
import Range from './range';
import ModelFilter from '../../../model/model-filter';

export default class FilterRange extends Control {
  data: Record<string, Range>[] =[];
  updateHandler: () => void;
  model: ModelFilter;

  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['filter-range']);
    this.updateHandler = () => this.update(model);
    this.model.onUpdate.add(this.updateHandler);
    
    const title = new Control(this.node, 'h3', '', 'FILTERS BY RANGE');

    const rangeCount = new Range(this.node, 'Count of copies:', '1', '12', '1');
    rangeCount.onChangeRange = (from, to)=> {
        model.changeRange('count', from,to)
    }
    this.data.push({ 'count': rangeCount });
    
    const rangeYear = new Range(this.node, 'Year of purchase: ', '1940', '2020', '10');
    rangeYear.onChangeRange = (from, to)=> {
        model.changeRange('year', from,to)
    }
    this.data.push({ 'year': rangeYear });
    this.update(model);
  }

  update(model: ModelFilter) {
     const range = model.range;
    this.data.forEach((item) => {
      Object.keys(item).map(it => {
        item[it].update(Object.values(range[it]))
      })
    })
  }
  destroy() {
    this.model.onUpdate.remove(this.updateHandler);
    super.destroy();
  }
}