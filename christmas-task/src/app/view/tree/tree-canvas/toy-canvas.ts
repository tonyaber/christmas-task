import Control from '../../../../common/control';
import style from './canvas.css';


export default class ToyCanvas extends Control { 
  width: number = 800;
  height: number = 1000;
  toyX: { start: number, finish: number } = {start: null, finish: null}
  toyY: { start: number, finish: number } = { start: null, finish: null };
  num: string;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  isMove: boolean = false;
  id: number;
  constructor(parentNode: HTMLElement,context: CanvasRenderingContext2D, num:string, x:number, y:number, id:number) {
    super(parentNode);
    this.context = context    
    this.num = num;
    this.id = id;
    this.x = x;
    this.y = y;
    this.toyX.start = this.x - 30;
    this.toyX.finish =this.x + 30;
    this.toyY.start = this.y - 30;
    this.toyY.finish = this.y + 30;
  }

  // render() {
  //   const toy = new Image(); 
  //   toy.src = `../../../assets/toys/${this.num}.png`;
  //   toy.classList.add(style['toy-img']);
  //   toy.onload =()=> {
  //     this.context.drawImage(toy, this.x - toy.width /10, this.y-toy.height /10, toy.width/5, toy.height/5);         
  //   }   
   
  // }

  handleEnter(e: MouseEvent) {
    if(e.offsetX > this.toyX.start
      && e.offsetX < this.toyX.finish
      && e.offsetY > this.toyY.start
      && e.offsetY < this.toyY.finish) {
        this.isMove = true;
      }
  }

  handleLeave(e:MouseEvent) {
    // if(e.offsetX > this.toyX.start
    //   && e.offsetX < this.toyX.finish
    //   && e.offsetY > this.toyY.start
    //   && e.offsetY < this.toyY.finish
    //   && this.isMove) {
    
      this.isMove = false;
   
  }

  isShape(e:MouseEvent) {
    return (e.offsetX > this.toyX.start
      && e.offsetX < this.toyX.finish
      && e.offsetY > this.toyY.start
      && e.offsetY < this.toyY.finish)
  }

  handleMove(e: MouseEvent) {
    if (this.isMove) {
      return true;
      this.x = e.offsetX;
      this.y = e.offsetY;
     // this.render();
      }
    
  }
}