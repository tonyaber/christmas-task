import Control from '../../../../common/control';
import style from '../setting-style.css';
import Checkbox from '../checkbox';
import ModelToys from '../../../model/model-toys';

export default class Form extends Control {
  model: ModelToys;
  constructor(parentNode: HTMLElement, model:ModelToys) {
    super(parentNode, 'div', style['form']);
    this.model = model;
    const name = new Control(this.node, 'h4', style.name, 'Form:');
    const round = new Checkbox(this.node, 'round');
    round.onChangeFilter = (checkBoxName)=> {
      this.model.changeDate(checkBoxName, 'shape')
    }
    const bell = new Checkbox(this.node, 'bell');
    bell.onChangeFilter = (checkBoxName)=> {
      this.model.changeDate(checkBoxName,'shape')
    }
    const cone = new Checkbox(this.node, 'cone');
    cone.onChangeFilter = (checkBoxName)=> {
      this.model.changeDate(checkBoxName,  'shape')
    }
    const snowflake = new Checkbox(this.node, 'snowflake');
    snowflake.onChangeFilter = (checkBoxName)=> {
      this.model.changeDate(checkBoxName, 'shape')
    }
    const figurine = new Checkbox(this.node, 'figurine');
    figurine.onChangeFilter = (checkBoxName)=> {
      this.model.changeDate(checkBoxName, 'shape')
    }
  }
}