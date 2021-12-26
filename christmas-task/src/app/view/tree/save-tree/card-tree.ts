import Control from '../../../../common/control';
import { IImages } from '../../../../dto';
import { WIDTH, HEIGHT } from '../tree-canvas/const';

export default class CardTree extends Control {
  card: IImages[];
  constructor(parentNode: HTMLElement, card: IImages[]) {
    super(parentNode);
    this.card = card;
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const context = canvas.getContext('2d');
    this.render(context, canvas);
  
  }

  render(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
    const url = this.card.map(item => this.loadImage(item.src));
    Promise.all(url).then((img) => {
      this.card.forEach((item, index) => {        
        context.drawImage(img[index], item.startX, item.startY, item.width, item.height);
        // if (item.name == 'tree') {
        //   this.context.filter = this.isGarlandLight ? 'blur(1px) opacity(0.4)' : 'blur(3px)';       
        //   this.createGarland(this.colorGarland)
        // }
      });    
    }).then(() => {
      const image = new Image();
      image.src = canvas.toDataURL();
      image.onload = () => {
        this.node.append(image);
      }
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
}