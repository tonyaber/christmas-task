import Control from '../../../../common/control';
import ModelToys from '../../../model/model-toys';
import style from '../setting-style.css';
import Toy from './toy';

export default class ToysList extends Control {
  model: ModelToys;
  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, 'div', style['toys']);
    this.model = model;
    const toys = model.getAllToys();
    
    toys.forEach(item => {
      const toy = new Toy(this.node, item);
    })

  }
}

