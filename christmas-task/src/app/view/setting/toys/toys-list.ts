import Control from '../../../../common/control';
import { IToy } from '../../../../dto';
import ModelSort from '../../../model/model-sort';
import style from './toys.css';
import Toy from './toy';
import Popup from './popup';

export default class ToysList extends Control {
  model: ModelSort;
  toys: Toy[] = [];
  popups: Popup[] = [];
  isFullSelected: boolean;
  overFlowHandler: () => void;
  updateHandler: () => void;

  constructor(parentNode: HTMLElement, model: ModelSort) {
    super(parentNode, 'div', style['toys']);
    this.overFlowHandler = () => {
        const popup = new Popup(this.node, 'Sorry, no matches found');
        popup.onDeletePopup = () => {
          popup.destroy()
        }
        this.popups.push(popup);
    }
    this.updateHandler = () => this.update(model);
    
    model.onUpdate.add(this.updateHandler);
        
    model.onOverFlow.add(this.overFlowHandler);
    
    this.model = model;
    this.update(model);
  }

  update(model: ModelSort) {
    this.popups.map(item => item.destroy());
    this.popups = [];
    
    if (model.isEmptyList||model.isEmptySearch) {
        const popup = new Popup(this.node, 'Sorry, no matches found');
        popup.onDeletePopup = () => {
          popup.destroy()
        }
        this.popups.push(popup);
    }
    this.createToys(model.getToys());  
  }

  createToys(data: IToy[]) {
    while (data.length < this.toys.length) {
      const item = this.toys.pop();
      item.animateOut().then(()=>item.destroy())
      
     
    }
    while (data.length > this.toys.length) {
      const toy = new Toy(this.node);
      toy.animateOut();
      toy.animateIn();
      this.toys.push(toy);
    }

    data.forEach((element, index) => { 
      this.toys[index].update(element);
      this.toys[index].onSelectToy = () => {
        this.model.selectToy(element)  
      }
    });
  }
  destroy() {
    this.model.onOverFlow.remove(this.overFlowHandler);
    this.model.onUpdate.remove(this.updateHandler);
    super.destroy();
  }
}


