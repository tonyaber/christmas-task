import Control from '../../../../common/control';
import style from './canvas.css';


export default class ToyCanvas extends Control { 
  width: number = 800;
  height: number = 1000;
  toyX: { start: number, finish: number } = {start: null, finish: null}
  toyY: { start: number, finish: number } = { start: null, finish: null };
  id: string;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  constructor(parentNode: HTMLElement,context: CanvasRenderingContext2D, id:string, x:number, y:number) {
    super(parentNode);
    this.context = context    
    this.id = id;
    this.x = x;
    this.y = y;
  }

  render() {
    const toy = new Image(); 
    toy.src = `../../../assets/toys/${this.id}.png`;
    toy.classList.add(style['toy-img']);
    toy.onload =()=> {
      this.context.drawImage(toy, this.x - toy.width /10, this.y, toy.width/5, toy.height/5);         
    }   
    this.toyX.start = this.x - toy.width / 15;
    this.toyX.finish =this.x + toy.width / 15;
    this.toyY.start = this.y;
    this.toyY.finish =this.y+toy.height/5
  }

  handleMove(e: MouseEvent) {
    if (e.offsetX > this.toyX.start
      && e.offsetX < this.toyX.finish
      && e.offsetY > this.toyY.start
      && e.offsetY < this.toyY.finish) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      }
    
  }
}