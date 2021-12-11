import Signal from "../../common/signal";
import { IFilter } from "../../dto";
export default class ModelFilter{
  onUpdate: Signal<void> = new Signal();
  filters: Record<string, Record<string, boolean>>;

  constructor() {
    this.filters = {
      'shape': {
        'round': false,
        'bell': false,
        'cone': false,
        'snowflake': false,
        'figurine': false,
      },
      'color': {
        'white': false,
        'yellow': false,
        'red': false,
        'blue': false,
        'green': false,
      },
      'size': {
        'small': false,
        'middle': false,
        'big': false,
      },
      'favorite': {
        'favorite': false,
      }
    }
    
  }
  getFilters() {
    return this.filters;
  }

  changeData(name:string, filter: string, isChecked: boolean) {
    this.filters = {
      ...this.filters,
      [filter]: {
        ...this.filters[filter],
        [name]: isChecked,
      }
    } 
    this.onUpdate.emit();
  }

}