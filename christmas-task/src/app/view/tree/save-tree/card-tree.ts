import Control from '../../../../common/control';
import { IGarland, IImages } from '../../../../dto';
import { WIDTH, HEIGHT, GARLANDS } from '../tree-canvas/const';
import style from './card.css';

export default class CardTree extends Control {
  card: IImages[];
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  garland: IGarland [];
  onChangeCanvas: (card: IImages[], garland: string)=>void;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style.card);
    this.garland = GARLANDS;
   
    this.canvas = document.createElement('canvas');
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.context = this.canvas.getContext('2d');
  
  }

  update(card: IImages[], garland: string) {
    this.card = card;
    const url = this.card.map(item => this.loadImage(item.src));
    Promise.all(url ).then((img) => {
      this.card.forEach((item, index) => {    
        this.context.filter = 'none';
        this.context.drawImage(img[index], item.startX, item.startY, item.width, item.height);
        if (item.name == 'tree') {
          this.context.filter =  'blur(3px)';       
          this.createGarland(garland)
        }
      });    
    })
      .then(() => {
      const image = new Control<HTMLImageElement>(this.node, 'img', style['card-img']);
      image.node.src = this.canvas.toDataURL();
        image.node.onclick = () => {
        this.onChangeCanvas(card, garland)
      }
      const downloadBtn = new Control(this.node, 'button', style.download, 'Download');
      downloadBtn.node.onclick = () => {
        const link = document.createElement("a");    
        link.setAttribute("href", image.node.src);
        link.setAttribute("download", 'tree');
        link.click();
      }
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

  loadImage(src:string):Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      let image = new Image();
      image.onload = () => {
        resolve(image);
      }
      image.src = src;
    })
  }
}