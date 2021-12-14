import Control from '../../../../common/control';
import style from '../setting-style.css';
import Shape from './shape'; 
import Color from './color';
import Size from './size';
import Favorite from './favorite';
import ModelFilter from '../../../model/model-filter';

export default class FilterValue extends Control { 
  constructor(parentNode: HTMLElement, model: ModelFilter) {
    super(parentNode, 'div', style['filter-value']);
    
    const title = new Control(this.node, 'h3', '', 'FILTERS BY VALUE');
   
    const shape = new Shape(this.node, model);
    const color = new Color(this.node, model);
    const size = new Size(this.node, model);
    const favorite = new Favorite(this.node, model);
  }
}