import Control from '../../../../common/control';
import ModelToys from '../../../model/model-toys';
import style from '../setting-style.css';

export default class Toys extends Control {
  model: ModelToys;
  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, 'div', style['toys']);
    this.model = model;
    const toys = model.getAllToys();
    toys.forEach(item => {
      const toyItem = new Control(this.node, 'div', style['toy-item']);
      const titleToy = new Control(toyItem.node, 'h5', '', item.name);
      const imageToy = new Control<HTMLImageElement>(toyItem.node, 'img');
      imageToy.node.src = `../../assets/toys/${item.num}.png`;
      

    })

  }
}
// color: "желтый"
// count: "2"
// favorite: false
// name: "Большой шар с рисунком"
// num: "1"
// shape: "шар"
// size: "большой"
// year: "1960"

