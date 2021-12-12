import Control from "../../../../common/control";


export default class Select extends Control{
  onChangeSort: (value:string)=>void;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    const select = new Control<HTMLSelectElement>(this.node, 'select');
    const optionFromAtoZ = new Control<HTMLOptionElement>(select.node, 'option', '', 'By name from "A" to "Z"');
    optionFromAtoZ.node.value = 'a-z';

    const optionFromZtoA = new Control<HTMLOptionElement>(select.node, 'option', '', 'By name from "Z" to "A"');
    optionFromZtoA.node.value = 'z-a';

    const optionAscending = new Control<HTMLOptionElement>(select.node, 'option', '', 'By quantity ascending');
    optionAscending.node.value = 'ascending';

    const optionDescending = new Control<HTMLOptionElement>(select.node, 'option', '', 'By quantity descending');
    optionDescending.node.value = 'descending';

    select.node.onchange = () => {
      this.onChangeSort(select.node.value);
    }
  }
}