import Control from '../../../../common/control';
import { IImages, IMap, IGarland } from '../../../../dto';
import ModelTree from '../../../model/model-tree';
import { GARLANDS, WIDTH, HEIGHT } from './const';

import style from './canvas.css';


export default class Canvas extends Control {
  width: number = WIDTH;
  height: number = HEIGHT;
  context: CanvasRenderingContext2D;
  updateHandler: () => void;
  updateHandlerTree: () => void;
  updateHandlerGarland: () => void;
  updateHandlerSnow: () => void;
  updateCanvas: () => void;
  saveHandlerTree: () => void;
  model: ModelTree;
  mapTree: IMap[] = [];
  tree: number;
  background: number;
  id: number = 0;
  images:IImages[]=[];
  garland:IGarland[]=GARLANDS;
  colorGarland: string;
  isGarlandLight: boolean = true;
  snowContainer: Control<HTMLElement>;


  
  constructor(parentNode: HTMLElement, model:ModelTree) {
    super(parentNode, 'div', style['canvas-container']);
    this.model = model;
    this.tree = this.model.tree;
    this.garland = GARLANDS;
    this.colorGarland = model.garland;
    this.createMap();

    this.snowContainer = new Control(this.node, 'div', style['snow-container']);
    this.createSnow(model);

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

    this.updateHandlerGarland = () => {
      this.colorGarland = model.garland;
      this.render();
    }
    model.onUpdateGarland.add(this.updateHandlerGarland);

    this.updateHandlerSnow = () => {
      this.createSnow(model);
    }
    model.onUpdateSnow.add(this.updateHandlerSnow);

    this.saveHandlerTree = () => {
      this.model.saveTree(this.images);
      this.createFirstState();
    }
    model.onSaveTree.add(this.saveHandlerTree);

    this.updateCanvas = () => {
      this.images = this.model.actualTree;
      this.colorGarland = this.model.garland;
      this.render();
    }

    model.onUpdateCanvas.add(this.updateCanvas);

    setInterval(() => {
      this.isGarlandLight = !this.isGarlandLight;
      this.render();
    }, 500)

    this.createFirstState();

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

    canvas.node.onmousedown = (e) => {
      for (let i =this.images.length-1; i >=0; i--){
        if (this.images[i].name != 'tree' && this.images[i].name != 'background' && this.isShape(e, this.images[i])) {
          this.images[i].isMove = true;
          break;
        }
      }
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
    return (e.offsetX > toy.startX
      && e.offsetX < toy.startX+60
      && e.offsetY > toy.startY
      && e.offsetY < toy.startY + 60)
  }

  createFirstState() {
    this.images = [{
      name: 'background',
      src: `../../../assets/bg/${this.model.background}.jpg`,
      startX: 0,
      startY: 0,
      width: this.width,
      height: this.height,
    },
    {
      name: 'tree',
      src: `../../../assets/tree/${this.model.tree}.png`,
      startX: this.width * 0.15,
      startY: this.height * 0.25,
      width: this.width * 0.7,
      height: this.height * 0.7,
    }];
  }

  render() {
    const url = this.images.map(item => this.loadImage(item.src));
    Promise.all(url).then((img) => {
      this.images.forEach((item, index) => {
        this.context.filter = 'none'
        this.context.drawImage(img[index], item.startX, item.startY, item.width, item.height);
        if (item.name == 'tree') {
          this.context.filter = this.isGarlandLight ? 'blur(1px) opacity(0.4)' : 'blur(3px)';       
          this.createGarland(this.colorGarland)
        }
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

  createGarland(value: string) {
    const color = ['red', 'blue', 'yellow', 'white', 'violet','green', 'pink'];
    if (value == 'off') {
      return;
    } else {
      this.garland.forEach(item => {
      for (let i = item.start; i <= item.finish; i += 0.3){
        const x = item.radius * Math.cos(i) + 350;
        const y = item.radius * Math.sin(i) + item.y;
        this.context.beginPath();
        this.context.arc(x, y, 5, 0, 2 * Math.PI);

        if (value == 'multicolored') {
          this.context.fillStyle = color[Math.floor(Math.random() * 7)];
        } else {
          this.context.fillStyle = value;        }
        
        this.context.fill();
      }
    })   
    }    
  }

  createSnow(model:ModelTree) {
    if (model.isSnow) {
      this.snowContainer.node.classList.add(style.snow);
    } else {
      this.snowContainer.node.classList.remove(style.snow);
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
    this.model.onUpdateGarland.remove(this.updateHandlerGarland);
    this.model.onUpdateSnow.remove(this.updateHandlerSnow);
    this.model.onSaveTree.remove(this.saveHandlerTree);
    this.model.onUpdateCanvas.remove(this.updateCanvas);
    super.destroy();
  }
}
