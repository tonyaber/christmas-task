import Control from '../../../../common/control';
import style from './toys-list.css';

import ModelTree from '../../../model/model-tree';
import Toy from './toy';

export default class ToysList extends Control{
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode, 'div', style['toys-list-tree']);
    const toys = model.getToys();
    for (let i = 0; i < toys.length; i++){
      const toy = new Toy(this.node, toys[i])
    }

  }

}