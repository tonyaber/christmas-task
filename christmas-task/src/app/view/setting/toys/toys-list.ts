import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import ModelToys from '../../../model/model-toys';
import style from '../setting-style.css';
import Toy from './toy';

export default class ToysList extends Control {
  model: ModelToys;
  toys: Toy[] = [];

  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, 'div', style['toys']);
    this.model = model;
    model.onUpdate.add(
      () => {
        this.update(model);
      }
    );
    
    this.update(this.model);
  }

  update(model: ModelToys) {    
    this.createToys(model.getAllToys());    
  }

  createToys(data: IToy[]) {
    while (data.length < this.toys.length) {
      const item = this.toys.pop();
      item.destroy();
    }
    while (data.length > this.toys.length) {
      const toy = new Toy(this.node);     
      this.toys.push(toy);
    }

    data.forEach((element, index) => {
      this.toys[index].update(element);    
    });
  }
}


