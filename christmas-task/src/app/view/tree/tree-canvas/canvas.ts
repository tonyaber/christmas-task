import Control from '../../../../common/control';
import ModelTree from '../../../model/model-tree';
//import style from './canvas.css';

export default class Canvas extends Control {
  width: number = 800;
  height: number = 1000;
  context: CanvasRenderingContext2D;
  updateHandler: () => void;
  model: ModelTree;

  constructor(parentNode: HTMLElement, model:ModelTree) {
    super(parentNode);
    this.model = model;
    this.updateHandler = () => {
      this.setBg(model.background);
      this.setTree(model.tree);
    }
    model.onUpdate.add(this.updateHandler);
    
    const canvas = new Control<HTMLCanvasElement>(this.node, 'canvas');
    canvas.node.width = this.width;
    canvas.node.height = this.height;
    this.context = canvas.node.getContext('2d');
    this.setBg(model.background)
    this.setTree(model.tree);
  }

  setTree(value: number) {
    const imgTree = new Image();
    imgTree.src = `../../../assets/tree/${value}.png`;    
    imgTree.onload = () => {
      imgTree.width = this.width * 0.7;
      imgTree.height = this.height * 0.7;

      this.context.drawImage(imgTree, this.width*0.15, this.height*0.15, imgTree.width, imgTree.height)
    }
  }

  setBg(value: number) {
    const imgBg = new Image();
    imgBg.src = `../../../assets/bg/${value}.jpg`;    
    imgBg.onload = () => {  
      const cx = imgBg.width > this.width ? (imgBg.width - this.width) / 2 : 0;      
      const cy = imgBg.height > this.height ?(imgBg.height - this.height) / 2 : 0;
      this.context.drawImage(imgBg, cx, cy, (imgBg.width - cx), (imgBg.height - cy), 0, 0, this.width, this.height );
    }
  }

   destroy() {
    this.model.onUpdate.remove(this.updateHandler);
    super.destroy();
  }
}