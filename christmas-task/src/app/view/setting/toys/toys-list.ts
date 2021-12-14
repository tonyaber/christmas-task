import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import ModelSort from '../../../model/model-sort';
import style from '../setting-style.css';
import Toy from './toy';
import Popup from './popup';

export default class ToysList extends Control {
  model: ModelSort;
  toys: Toy[] = [];

  constructor(parentNode: HTMLElement, model: ModelSort) {
    super(parentNode, 'div', style['toys']);
        model.onUpdate.add(
      () => {
        this.update(model);
      }
    );
    
    this.model = model;
    this.update(model);
  }

  update(model: ModelSort) {   
    if (model.isFullSelected) {
      const popup = new Popup(this.node, 'Sorry, all slots are full');
      popup.onDeletePopup = () => {
        popup.destroy()
      }
    } else {
      if (model.isEmptyList) {
        const popup = new Popup(this.node, 'Sorry, no matches found');
        popup.onDeletePopup = () => {
          popup.destroy()
        }
      }
      this.createToys(model.getToys());  
    } 
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
      this.toys[index].onSelectToy = () => {
        this.model.selectToy(element)
      }
    });
  }
}


