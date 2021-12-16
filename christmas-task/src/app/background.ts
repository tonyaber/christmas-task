import Control from '../common/control';
import style from './app.css';

export default class Background extends Control{
   constructor(parentNode: HTMLElement) {
    super(parentNode);
    const tree = new Control(this.node, 'div', style.tree);
    const leftTree = new Control(tree.node, 'div', style['background-tree1']);
    const rightTree = new Control(tree.node, 'div', style['background-tree2']);
    
    document.body.onmousemove = (e) => {
      const width = (window.innerWidth - e.clientX * 3) / 100;
      const height = (window.innerHeight - e.clientY * 3) / 100;
      const scale = Math.floor(-(window.innerWidth - e.clientX * 3)/450)/100;
         
      leftTree.node.style.transform = `translate3d(${width}px,${-height}px, 0) scale(${scale+1})`;
      rightTree.node.style.transform = `translate3d(${-width}px,${-height}px, 0) scale(${scale+1})`;
    }
  }
}
