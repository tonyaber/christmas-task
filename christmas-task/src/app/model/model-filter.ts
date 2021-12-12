import Signal from "../../common/signal";
//import { IFilter } from "../../dto";
export default class ModelFilter{
  onUpdate: Signal<void> = new Signal();
  filters: Record<string, Record<string, boolean>>;
  range: Record<string, Record<string, number>>;
  sort: string;

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
    this.range = {
      'count': {
        'from': 1,
        'to': 12
      },
      'year': {
        'from': 1940,
        'to': 2020
      }
    };
    this.sort = 'a-z'
    
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

  changeRange(value:string, from:number, to:number) {
     this.range = {
      ...this.range,
      [value]: {
        'from':from,
        'to':to,
      }
    }
     this.onUpdate.emit();
  }

  changeSort(value:string) {
    this.sort = value; 
    this.onUpdate.emit();
  }

}