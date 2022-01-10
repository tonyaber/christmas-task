import Signal from "../../common/signal";
//import { IFilter } from "../../dto";
export default class ModelFilter{
  onUpdate: Signal<void> = new Signal();
  filters: Record<string, Record<string, boolean>>;
  range: Record<string, Record<string, number>>;
  sort: string;

  constructor() {
    this.getFiltersLocalStorage();    
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

    this.setFilterLocalStorage('tonyaber-filters', this.filters);
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

    this.setFilterLocalStorage('tonyaber-range', this.range);
    this.onUpdate.emit();
  }

  changeSort(value:string) {
    this.sort = value; 
    this.setFilterLocalStorage('tonyaber-sort', this.sort);
    this.onUpdate.emit();
  }

  resetFilters() {
    for (const key in this.filters) {
      for (const filter in this.filters[key]) {
        this.filters[key][filter] = false;
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

    this.setFilterLocalStorage('tonyaber-filters', this.filters);
    this.setFilterLocalStorage('tonyaber-range', this.range);
    this.onUpdate.emit();
  }

  setFilterLocalStorage(name: string, value: Record<string, Record<string, boolean>> | Record<string, Record<string, number>> | string) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getFiltersLocalStorage() {
    if (localStorage.getItem('tonyaber-filters')) {
      this.filters = JSON.parse(localStorage.getItem('tonyaber-filters'));
    } else {
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
    if (localStorage.getItem('tonyaber-range')) {
      this.range = JSON.parse(localStorage.getItem('tonyaber-range'));
    } else {
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
    }
    if (localStorage.getItem('tonyaber-sort')) {
      this.sort = JSON.parse(localStorage.getItem('tonyaber-sort'));
    } else {
      this.sort = '';
    }
  }

  resetLocalStorage() {
    localStorage.clear();
  }
}