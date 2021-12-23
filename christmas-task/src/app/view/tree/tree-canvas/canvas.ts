import Control from '../../../../common/control';
import ModelTree from '../../../model/model-tree';
import style from './canvas.css';
import ToyCanvas from './toy-canvas';
interface IMap {
  x: number;
  y: number;
}

export default class Canvas extends Control {
  width: number = 800;
  height: number = 1000;
  context: CanvasRenderingContext2D;
  updateHandler: () => void;
  updateHandlerTree: () => void;
  model: ModelTree;
  mapTree: IMap[] = [];
  toys:ToyCanvas[] = [];
  
  constructor(parentNode: HTMLElement, model:ModelTree) {
    super(parentNode);
    this.model = model;
    this.createMap(model.tree);
    this.updateHandler = () => {
      this.render();
    }
    model.onUpdate.add(this.updateHandler);
        
    this.updateHandlerTree = () => {
      this.createMap(model.tree);
    }
    model.onUpdateTree.add(this.updateHandlerTree);

    const canvas = new Control<HTMLCanvasElement>(this.node, 'canvas', style.canvas);
    canvas.node.width = this.width;
    canvas.node.height = this.height;
    this.context = canvas.node.getContext('2d');
    this.render()

    canvas.node.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move"
    }
    canvas.node.ondrop = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      
      e.preventDefault();
      if (this.mapTree.find(item => item.x == x && item.y == y)) {     
        const id = e.dataTransfer.getData('id')
        this.model.setDrop(id, true);
        const toy = new ToyCanvas(this.node,this.context, id, x,y);
        toy.render()
        this.toys.push(toy)
      }
    }

    canvas.node.onmousedown = (e) => {
      this.toys.forEach(item => {
        item.handleMove(e);
        this.render();
      })
    }
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.setBg(this.model.background)
    this.setTree(this.model.tree);
    this.toys.forEach(item => item.render());
  }

  setTree(value: number) {
    const imgTree = new Image();
    imgTree.src = `../../../assets/tree/${value}.png`;    
    imgTree.onload = () => {
      imgTree.width = this.width * 0.7;
      imgTree.height = this.height * 0.7;
      this.context.drawImage(imgTree, this.width*0.15, this.height*0.25, imgTree.width, imgTree.height)
    }
  }

  setBg(value: number) {
    const imgBg = new Image();
    imgBg.src = `../../../assets/bg/${value}.jpg`;    
    imgBg.onload = () => {  
      const cx = imgBg.width > this.width ? (imgBg.width - this.width) / 2 : 0;      
      const cy = imgBg.height > this.height ? (imgBg.height - this.height) / 2 : 0;
      this.context.drawImage(imgBg, cx, cy, (imgBg.width - cx), (imgBg.height - cy), 0, 0, this.width, this.height );
    }
  }

  createMap(value: number) {
    const image = new Image();
    image.src = `../../../assets/tree/${value}.png`;  
    image.onload = () => {
      this.mapTree = [];   
      const newCanvas = new Control<HTMLCanvasElement>(this.node, 'canvas');
      newCanvas.node.width = this.width;
      newCanvas.node.height = this.height;
      const newContext = newCanvas.node.getContext('2d');
      newContext.drawImage(image, this.width * 0.15, this.height * 0.25, image.width, image.height);
      const allPixels = newContext.getImageData(0, 0, this.width, this.height).data;
      
      let x = 0,
        y = 0;
      for (let i=0; i < allPixels.length; i+=4) {
        if (x >= this.width) {
          x = 0;
          y++;
        }
        if (allPixels[i]) {
          this.mapTree.push({'x':x, 'y':y});
          
        }
        x++;
      }  
      newCanvas.destroy();
    }
    
    
  }

  destroy() {
    this.model.onUpdate.remove(this.updateHandler);
    this.model.onUpdateTree.remove(this.updateHandlerTree);
    super.destroy();
  }
}