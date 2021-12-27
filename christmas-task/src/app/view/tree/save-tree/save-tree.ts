import Control from '../../../../common/control';
import { IImages } from '../../../../dto';
import ModelTree from '../../../model/model-tree';
import CardTree from './card-tree';
import style from './card.css';

export default class SaveTree extends Control{
  cards: CardTree[] = [];

  
  updateHandler: ()=>void;
  model: ModelTree;
  constructor(parentNode: HTMLElement, model: ModelTree) {
    super(parentNode,'div',style['cards-container']);
    this.model = model;
    this.updateHandler = () => {
      this.addNewCard(model.canvasImage, model.garland);
    }

    model.onUpdateSaveTree.add(this.updateHandler);
    this.createCard(model.canvasImage, model.garland);
  }

  createCard(data: IImages[][], garland: string) {
    if (data.length) {
    this.node.classList.add(style['hide-card'])
    }
    data.map((element, index) => {
      const card = new CardTree(this.node);
      card.onChangeCanvas = (dataCard, dataGarland) => {
        this.model.changeCanvas(dataCard, dataGarland)
      }
      this.cards.push(card);
      this.cards[index].update(element, garland);
    });    
  }

  addNewCard(data: IImages[][], garland: string) {
    this.node.classList.add(style['hide-card'])
    const card = new CardTree(this.node);
    card.onChangeCanvas = (dataCard, dataGarland) => {
        this.model.changeCanvas(dataCard, dataGarland)
      }
    this.cards.push(card);
    card.update(data[data.length - 1], garland);
  }
  destroy(){
    this.model.onUpdateSaveTree.remove(this.updateHandler);
    super.destroy();
  }
  
}