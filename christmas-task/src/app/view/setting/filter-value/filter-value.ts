import Control from '../../../../common/control';
import style from '../setting-style.css';
import Shape from './shape'; 
import Color from './color';
import ModelToys from '../../../model/model-toys';

export default class FilterValue extends Control {
  model: ModelToys;
  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, 'div', style['filter-value']);
    this.model = model;
    const title = new Control(this.node, 'h3', '', 'FILTERS BY VALUE');
    const shape = new Shape(this.node, this.model);
    const color = new Color(this.node, this.model);
  }
}