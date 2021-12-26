import Control from '../../../../common/control';
import { IImages } from '../../../../dto';
import ModelTree from '../../../model/model-tree';
import CardTree from './card-tree';

export default class SaveTree extends Control{
  cards: IImages[][] = [];
  updateHandler: ()=>void;
  model: ModelTree;
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode);
    this.model = model;
    this.updateHandler = () => {
      this.cards = model.canvasImage;
      this.createCard();
    }

    model.onUpdateSaveTree.add(this.updateHandler);
    this.createCard();
  }

  createCard() {
    this.cards.forEach(item => {
      const cardTree = new CardTree(this.node, item);
    })
  }
  destroy(){
    this.model.onUpdateSaveTree.remove(this.updateHandler);
    super.destroy();
  }
  
}