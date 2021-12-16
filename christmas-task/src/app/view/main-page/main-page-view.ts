import Control from '../../../common/control';
import ModelToys from '../../model/model-toys';
import style from './main-style.css';
import  Page  from '../../page';
import Footer from '../footer/footer'
export default class MainPage extends Page {
  onStartButtonClick: () => void;

  constructor(parentNode: HTMLElement, model: ModelToys) {    
    super(parentNode, style.main);    
    
    const title = new Control(this.node, 'div', style.title);
    const titleContent = new Control(title.node, 'h2', '', 'New Years game \n "Dress up the tree"');

    const startBtn = new Control<HTMLAnchorElement>(this.node, 'a', style['btn-start'], 'Start game');
    startBtn.node.href = '#setting';
     const footer = new Footer(this.node);
   }
}