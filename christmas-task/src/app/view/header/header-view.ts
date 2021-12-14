import Control from '../../../common/control';
import style from './header-style.css';
import logo from '../../../assets/svg/tree.svg'
import ModelSort from '../../model/model-sort';
import Search from './search';
export default class HeaderView extends Control{
  favoriteCount: Control<HTMLSpanElement>;  
  constructor(parentNode: HTMLElement, model: ModelSort) {
    super(parentNode, 'header', style.header);
    model.onUpdate.add(
      () => {
        this.update(model);
      }
    );

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
    const search = new Search(headerControl.node);
    search.onSearch = (value) => {
      model.searchToy(value);
    }
    const favoriteContainer = new Control(headerControl.node, 'div', style['favorite-container']);
    this.favoriteCount = new Control<HTMLSpanElement>(favoriteContainer.node, 'span', style['favorite-count']);
    this.update(model)
  }

  update(model:ModelSort) {
    const countSelected = model.selectedToy.length;
    this.favoriteCount.node.textContent = countSelected.toString();
  }
  
}