import Control from '../../../../common/control';
import style from './toys-list.css';

import ModelTree from '../../../model/model-tree';
import Toy from './toy';
import { IToy } from '../../../../dto';

export default class ToysList extends Control{
  model: ModelTree;
  onDropHandler: () => void;
  onUpdateHandler: () => void;
  toysView: Toy[] = [];
  toys: IToy[] = [];
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode, 'div', style['toys-list-tree']);
    this.model = model;

    this.onUpdateHandler = () => {
      const toys = model.getToys();
       for (let i = 0; i < toys.length; i++){
          const toy = new Toy(this.node, toys[i])
          this.toysView.push(toy);
       }
    }

    this.model.onUpdateToy.add(this.onUpdateHandler);
  
    this.onDropHandler = () => {
      this.update(model)
    }
   this.model.onDrop.add(this.onDropHandler)

  }

  update(model: ModelTree) {
    const toys = model.getToys();
    this.toysView.forEach((item, index) => {
      item.update(toys[index].count)
    })
  }
  destroy() {
    this.model.onDrop.remove(this.onDropHandler);
    this.model.onUpdateToy.remove(this.onUpdateHandler);
    super.destroy();
  }
}