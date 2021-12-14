import Control from "../../../common/control";
import style from './header-style.css';
export default class Search extends Control{
  onSearch: (value: string)=>void;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const searchInput = new Control<HTMLInputElement>(this.node, 'input');
    searchInput.node.placeholder = 'Search';
    const cleanBtn = new Control(this.node, 'button', style['cleanBtn'], '✖');
    cleanBtn.node.onclick = () => {
      searchInput.node.value = '';
      this.onSearch('')
    }

    searchInput.node.oninput = () => {
      this.onSearch(searchInput.node.value);
    }
  }
}