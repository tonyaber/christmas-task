import Control from '../common/control';
import style from './app.css';

export default class Background extends Control{
  leftTree: Control<HTMLElement>;
  rightTree: Control<HTMLElement>;
  bottomTree: Control<HTMLElement>;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const tree = new Control(this.node, 'div', style.tree);
    //this.node.classList.add(style.tree)
    //this.bottomTree = new Control(tree.node, 'div', style['background-tree3'])
    this.leftTree = new Control(tree.node, 'div', style['background-tree1']);
    this.rightTree = new Control(tree.node, 'div', style['background-tree2']);
    
    document.body.onmousemove = (e) => {
      const width = (window.innerWidth - e.clientX * 3) / 100;
      const height = (window.innerHeight - e.clientY * 3) / 100;
      const scale = Math.floor(-(window.innerWidth - e.clientX * 3)/450)/100;
         
      this.leftTree.node.style.transform = `translate3d(${width}px,${-height}px, 0) scale(${scale+1})`;
      this.rightTree.node.style.transform = `translate3d(${-width}px,${-height}px, 0) scale(${scale+1})`;
      //this.bottomTree.node.style.transform = `translate3d(${width/2}px,${height}px, 0) scale(${scale+1})`;
    }
  }
}
