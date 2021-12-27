import ModelToys from '../../model/model-toys';
import Page from '../../page';
import Setting from './tree-setting/setting';
import Canvas from './tree-canvas/canvas';
import ToysList from './tree-toys/toys-list';
import Music from './music'
import style from './tree.css';
import SaveButton from './save-tree/save-button';
import SaveTreeContainer from './save-tree/save-tree';
import Control from '../../../common/control';
export default class TreePage extends Page {
  model: ModelToys;

  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, style.tree);
    this.model = model;
    model.modelTree.onUpdateMusic.add(() => {
      Music.isMusicPlay = model.modelTree.isMusic;
      Music.playMusic();
    })
    document.body.onclick = () => {
      if (model.modelTree.isMusic) {
        Music.playMusic();
      }
    }    

    const setting = new Setting(this.node, model.modelTree);
    const canvas = new Canvas(this.node, model.modelTree);
    const toysContainer = new Control(this.node, 'div', style['toys-container']);
    const toys = new ToysList(toysContainer.node, model.modelTree);
    const saveBtn = new SaveButton(toysContainer.node);
    saveBtn.onSaveHandler = () => {
      this.model.modelTree.onSaveButtonClick();
    }
    const saveTreeContainer = new SaveTreeContainer(toysContainer.node, model.modelTree);
  }
}