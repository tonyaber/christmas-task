import Control from '../../../../common/control';
import ModelTree from '../../../model/model-tree';
import style from './canvas.css';
import ToyCanvas from './toy-canvas';
interface IMap {
  x: number;
  y: number;
}


interface IImages {
  name: string,
  num?: string;
  src: string,
  startX: number,
  startY: number,
  width: number,
  height: number,
  isMove?:boolean
}
export default class Canvas extends Control {
  width: number = 700;
  height: number = 900;
  context: CanvasRenderingContext2D;
  updateHandler: () => void;
  updateHandlerTree: () => void;
  model: ModelTree;
  mapTree: IMap[] = [];
  tree: number;
  background: number;
  id: number = 0;
  images:IImages[]=[];
  
  constructor(parentNode: HTMLElement, model:ModelTree) {
    super(parentNode);
    this.model = model;
    this.tree = this.model.tree;
    this.images.push({
      name: 'background',
      src: `../../../assets/bg/${this.model.background}.jpg`,
      startX: 0,
      startY: 0,
      width: this.width,
      height: this.height,
    });
      this.images.push({
      name: 'tree',
      src: `../../../assets/tree/${this.model.tree}.png`,
      startX: this.width*0.15,
      startY: this.height*0.25,
      width: this.width*0.7,
      height: this.height*0.7,
    });
    this.createMap();
    this.updateHandler = () => {
      this.tree = this.model.tree;
      this.images.find(item => item.name == 'tree').src = `../../../assets/tree/${this.tree}.png`;
      this.background = this.model.background;
      this.images.find(item => item.name == 'background').src = `../../../assets/bg/${this.background}.jpg`;
      this.render();
    }

    model.onUpdate.add(this.updateHandler);
        
    this.updateHandlerTree = () => {
      this.tree = this.model.tree;
      this.createMap();
    }
    model.onUpdateTree.add(this.updateHandlerTree);

    const canvas = new Control<HTMLCanvasElement>(this.node, 'canvas', style.canvas);
    canvas.node.width = this.width;
    canvas.node.height = this.height;
    this.context = canvas.node.getContext('2d');
    this.render();

    canvas.node.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move"
    }

    canvas.node.ondrop = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      
      e.preventDefault();
      if (this.mapTree.find(item => item.x == x && item.y == y)) {     
        const num = e.dataTransfer.getData('id')
        this.model.setDrop(num, true);
        this.images.push({
          name: this.id.toString(),
          num: num,
          src: `../../../assets/toys/${num}.png`,
          startX:x-30,
          startY: y-30,
          width: 60,
          height: 60,          
        })
        this.render();
        this.id++;
      }
    }

    let isMove = false;

    canvas.node.onmousedown = (e) => {
      this.images.forEach(item => {
        if (item.name!='tree'&&item.name!='background'&&this.isShape(e, item)) {
          item.isMove = true;
        }      
      })
    }

    canvas.node.onmousemove = (e) => {
      this.images.forEach(item => {
        if (item.isMove) {
          item.startX = e.offsetX - 30;
          item.startY = e.offsetY - 30;
          this.render();
        }
      })      
    }

    canvas.node.onmouseup = (e) => {
      this.images.forEach(item => {
        if (item.isMove) {
          item.isMove = false;
          if (!this.mapTree.find(item => item.x == e.offsetX && item.y == e.offsetY)) { 
            this.images = this.images.filter(elem => elem.name != item.name);
            this.model.setDrop(item.num, false);
            this.render();
          }
        }
      })
    }
  }

  isShape(e: MouseEvent, toy: IImages) {
    console.log(e.offsetY,toy.startY,  toy.startY+60)
    return (e.offsetX > toy.startX
      && e.offsetX < toy.startX+60
      && e.offsetY > toy.startY
      && e.offsetY < toy.startY + 60)
  }

  render() {
    const url = this.images.map(item => this.loadImage(item.src))   

    Promise.all(url).then((img) => {
      this.images.forEach((item, index) => {
        this.context.drawImage(img[index], item.startX, item.startY, item.width, item.height)
      });      
    })
  }

  loadImage(src:string):Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      let image = new Image();
      image.onload = () => {
        resolve(image);
      }
      image.src = src;
    })
  }

  setTree() {
    const imgTree = new Image();
    imgTree.src = `../../../assets/tree/${this.tree}.png`;    
    imgTree.onload = () => {
      imgTree.width = this.width * 0.7;
      imgTree.height = this.height * 0.7;
      this.context.drawImage(imgTree, this.width*0.15, this.height*0.25, imgTree.width, imgTree.height)
    }
  }

  setBg() {
    const imgBg = new Image();
    imgBg.src = `../../../assets/bg/${this.background}.jpg`;    
    imgBg.onload = () => {  
      const cx = imgBg.width > this.width ? (imgBg.width - this.width) / 2 : 0;      
      const cy = imgBg.height > this.height ? (imgBg.height - this.height) / 2 : 0;
      
      this.context.drawImage(imgBg, cx, cy, (imgBg.width - cx), (imgBg.height - cy), 0, 0, this.width, this.height );
    }
  }

  createMap() {
    const image = new Image();
    image.src = `../../../assets/tree/${this.tree}.png`;  
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