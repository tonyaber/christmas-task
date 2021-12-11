import Control from "../../../../common/control";


export default class CheckBox extends Control{
  onChangeFilter: (isChecked: boolean)=>void;
  
  constructor(parentNode: HTMLElement, className: string) {
    super(parentNode, 'label');
    const checkBox = new Control<HTMLInputElement>(this.node, 'input');
    checkBox.node.type = 'checkbox';
    checkBox.node.onchange = () => {
       this.onChangeFilter(checkBox.node.checked);
    }
    const span = new Control(this.node, 'span', className);
  }
}