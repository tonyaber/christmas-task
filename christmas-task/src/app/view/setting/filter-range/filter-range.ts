import Control from '../../../../common/control';
import style from '../setting-style.css';
import Range from './range';
import ModelFilter from '../../../model/model-filter';

export default class FilterRange extends Control {
  constructor(parentNode: HTMLElement, model:ModelFilter) {
    super(parentNode, 'div', style['filter-range']);
    const title = new Control(this.node, 'h3', '', 'FILTERS BY RANGE');
    const rangeCount = new Range(this.node, 'Count of copies:', '0', '12', '1', '0', '12');
    rangeCount.onChangeRange = (from, to)=> {
        model.changeRange('count', from,to)
      }
    const rangeYear = new Range(this.node, 'Year of purchase: ', '1940', '2020', '10', '1940', '2020');
    rangeYear.onChangeRange = (from, to)=> {
        model.changeRange('year', from,to)
      }
  }
}