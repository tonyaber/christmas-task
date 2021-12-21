import ModelToys from '../../model/model-toys';
import Page from '../../page';
import Setting from './tree-setting/setting';
import Canvas from './tree-canvas/canvas';
import ToysList from './tree-toys/toys-list';
import style from './tree.css';
export default class TreePage extends Page {
  model: ModelToys;

  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, style.tree);
    const setting = new Setting(this.node, model.modelTree);
    const canvas = new Canvas(this.node, model.modelTree);
    const toys = new ToysList(this.node, model.modelTree);

  }
}