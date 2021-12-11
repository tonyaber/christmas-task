import Control from '../../../common/control';
import style from './header-style.css';
import logo from '../../../assets/svg/tree.svg'

export default class HeaderView extends Control{  
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', style.header);
    const navigation = new Control(this.node, 'nav', style.navigation);
    const logoContainer = new Control<HTMLAnchorElement>(navigation.node, 'a', 'logo-container');
    logoContainer.node.href = '#main';
    const logoImg = new Control<HTMLImageElement>(logoContainer.node, 'img', style.logoImg);
    logoImg.node.src = logo;

    const logoTitle = new Control(logoContainer.node, 'h1', style.title, 'Christmas tree');
    
    const toys = new Control<HTMLAnchorElement>(navigation.node, 'a', style['navigation-item'], 'Toys');
    toys.node.href = '#setting';

    const tree = new Control<HTMLAnchorElement>(navigation.node, 'a', style['navigation-item'], 'Tree');
    tree.node.href = '#tree';

    const headerControl = new Control(this.node, 'div', style['header-control']);
    const searchInput = new Control<HTMLInputElement>(headerControl.node, 'input');
    searchInput.node.type = 'search';
    const favoriteContainer = new Control(headerControl.node, 'div', style['favorite-container']);
    const favoriteCount = new Control(favoriteContainer.node, 'span', style['favorite-count'],'5');
  }
  
}