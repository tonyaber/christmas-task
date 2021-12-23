import Control from '../../../../common/control';
import style from './toys-list.css';

import ModelTree from '../../../model/model-tree';
import Toy from './toy';

export default class ToysList extends Control{
  model: ModelTree;
  onDropHandler: () => void;
  toysView: Toy[] = [];
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode, 'div', style['toys-list-tree']);
    const toys = model.getToys();
    this.model = model;
    
    this.onDropHandler = () => {
      this.update(model)
    }
   this.model.onDrop.add(this.onDropHandler)
    
    for (let i = 0; i < toys.length; i++){
      const toy = new Toy(this.node, toys[i])
      this.toysView.push(toy);
    }

  }

  update(model: ModelTree) {
    const toys = model.getToys();
    this.toysView.forEach((item, index) => {
      item.update(toys[index].count)
    })
  }
  destroy() {
    this.model.onDrop.remove(this.onDropHandler);
    super.destroy();
  }
}