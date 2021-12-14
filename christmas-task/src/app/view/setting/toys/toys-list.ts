import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import ModelSort from '../../../model/model-sort';
import style from '../setting-style.css';
import Toy from './toy';

export default class ToysList extends Control {
  toys: Toy[] = [];

  constructor(parentNode: HTMLElement, model: ModelSort) {
    super(parentNode, 'div', style['toys']);
        model.onUpdate.add(
      () => {
        this.update(model);
      }
    );
    
    this.update(model);
  }

  update(model: ModelSort) {    
    this.createToys(model.getToys());    
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


