import Control from "../../../../common/control";


export default class Select extends Control{
  onChangeSort: (value:string)=>void;
  select: Control<HTMLSelectElement>;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.select = new Control<HTMLSelectElement>(this.node, 'select');

    const optionDefault = new Control<HTMLOptionElement>(this.select.node, 'option', '', 'Select sorting');
    optionDefault.node.value = '';
    optionDefault.node.disabled = true;
    optionDefault.node.hidden = true;

    const optionFromAtoZ = new Control<HTMLOptionElement>(this.select.node, 'option', '', 'By name from "A" to "Z"');
    optionFromAtoZ.node.value = 'a-z';

    const optionFromZtoA = new Control<HTMLOptionElement>(this.select.node, 'option', '', 'By name from "Z" to "A"');
    optionFromZtoA.node.value = 'z-a';

    const optionAscending = new Control<HTMLOptionElement>(this.select.node, 'option', '', 'By quantity ascending');
    optionAscending.node.value = 'ascending';

    const optionDescending = new Control<HTMLOptionElement>(this.select.node, 'option', '', 'By quantity descending');
    optionDescending.node.value = 'descending';

    this.select.node.onchange = () => {
      this.onChangeSort(this.select.node.value);
    }
  }

  update(value: string) {
    this.select.node.value = value;
  }
}