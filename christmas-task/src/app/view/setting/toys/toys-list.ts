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
  onSelectToyHandler: () => void;

  constructor(parentNode: HTMLElement, model: ModelSort) {
    super(parentNode, 'div', style['toys']);
    
    this.onSelectToyHandler = () => {
      const toysData = model.getToys();
      this.toys.map((item, index) => {
        item.updateSelect(toysData[index]);
      })
    }
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
    model.onSelectToy.add(this.onSelectToyHandler);
    
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

  showToys(data:IToy[]):Promise<void> {
    const toysData = data.map((element, index) => {
      this.toys[index].update(element);          
      this.toys[index].onSelectToy = () => {
      this.model.selectToy(element)
      }
      return this.toys[index].animateIn();
    });
    return Promise.all(toysData).then(()=>null);
  }

  hideToys():Promise<void> {
    const toysAnimation = this.toys.map(item => item.animateOut())
    return Promise.all(toysAnimation).then(() => null);
  }

  createToys(data: IToy[]) {
    return this.hideToys().then(() => {
      while (data.length < this.toys.length) {
        const item = this.toys.pop();
        item.destroy();      
      }
      while (data.length > this.toys.length) {
        const toy = new Toy(this.node);
        this.toys.push(toy);
      }
      return this.showToys(data);
    });    
  }
  destroy() {
    this.model.onOverFlow.remove(this.overFlowHandler);
    this.model.onUpdate.remove(this.updateHandler);
    this.model.onSelectToy.remove(this.onSelectToyHandler);
    super.destroy();
  }
}


