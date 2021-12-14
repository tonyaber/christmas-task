import Control from "../../../common/control";

export default class Search extends Control{
  onSearch: (value: string)=>void;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const searchInput = new Control<HTMLInputElement>(this.node, 'input');
    //searchInput.node.type = 'search';
    searchInput.node.placeholder = 'Search';
    const clean = new Control(this.node, 'button', '', '✖');
    clean.node.onclick = () => {
      searchInput.node.value = '';
      this.onSearch('')
    }

    searchInput.node.oninput = () => {
      this.onSearch(searchInput.node.value);
    }
  }
}