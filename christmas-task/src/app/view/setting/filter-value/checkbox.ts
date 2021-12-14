import Control from "../../../../common/control";

export default class CheckBox extends Control{
  checkBox: Control<HTMLInputElement>;
  onChangeFilter: (isChecked: boolean)=>void;
  
  constructor(parentNode: HTMLElement, className: string) {
    super(parentNode, 'label');
    this.checkBox = new Control<HTMLInputElement>(this.node, 'input');
    this.checkBox.node.type = 'checkbox';
    this.checkBox.node.onchange = () => {
       this.onChangeFilter(this.checkBox.node.checked);
    }
    const span = new Control(this.node, 'span', className);
  }

  update(isChecked:boolean) {
    this.checkBox.node.checked = isChecked;
  }
}