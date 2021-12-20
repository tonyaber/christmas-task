import Control from '../../../../common/control';
//import style from './canvas.css';

export default class Canvas extends Control {
  context: CanvasRenderingContext2D;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const canvas = new Control<HTMLCanvasElement>(this.node, 'canvas');
    canvas.node.width = 800;
    canvas.node.height = 1000;
    this.context = canvas.node.getContext('2d');
    //const img = new Control<HTMLImageElement>(this.node, 'img');
    //img.node.src = '../../../assets/bg/1.jpg';
    canvas.node.style.background = 'url(../../../assets/bg/1.jpg)';
    //this.context.drawImage(img.node, 10, 10);
  	//this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);
  }
}