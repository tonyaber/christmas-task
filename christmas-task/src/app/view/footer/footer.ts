import Control from '../../../common/control';
import style from './footer.css';
import logoImg from '../../../assets/svg/rss.svg';

export default class Footer extends Control {
 
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', style.footer);
    const logoContainer = new Control<HTMLAnchorElement>(this.node, 'a', '');
    logoContainer.node.href = 'https://rs.school/';
    const logo = new Control<HTMLImageElement>(logoContainer.node, 'img');
    logo.node.src = logoImg;
    const gitHub = new Control<HTMLAnchorElement>(this.node, 'a', '', 'Berchuk Antonina 2021');
    gitHub.node.href = 'https://github.com/tonyaber'
  }
}