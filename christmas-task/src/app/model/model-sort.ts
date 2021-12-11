import Signal from "../../common/signal";
import { IToy } from '../../dto';

export default class ModelSort{
  onUpdate: Signal<void> = new Signal();
  toys: IToy[];
  filtersToys: IToy[];
  constructor() {
    this.toys = []
    this.filtersToys = [];    
  }

  setToys(toys:IToy[]) {
    this.toys = toys;
    this.filtersToys = toys;
    this.onUpdate.emit();
  }

  getToys() {
    return this.filtersToys;
  }
  
  filtersDataByValue(key: string, value: string, toys: IToy[]) {
    if (value === 'favorite') {
      return toys.filter(item => item[key as keyof IToy]===true)
    } else {
      return toys.filter(item => item[key as keyof IToy]===value)
    }
  }  

  filtersDataByRange(key: string, from: number, to: number, toys: IToy[]) {
    return toys.filter(item => item[key as keyof IToy] >= from && item[key as keyof IToy] <= to);
  }
  
  changeData(filters:Record<string, Record<string, boolean>>, range: Record<string, Record<string, number>>) {
    this.filtersToys =[];
    let arrayWithFilters:IToy[] = this.toys;
  
    for (let key in filters) {
      let arrayArrayWithAllFilters: IToy[] = [];
      let isFilter = false;
      for (let value in filters[key]) {
        if (filters[key][value]) {
          isFilter = true;
          arrayArrayWithAllFilters = arrayArrayWithAllFilters.concat(this.filtersDataByValue(key,value, arrayWithFilters));
        }
      }
      if (isFilter) {
        arrayWithFilters = arrayArrayWithAllFilters;
      }
      
    }   
    for (let key in range) {
      arrayWithFilters = this.filtersDataByRange(key, range[key]['from'], range[key]['to'], arrayWithFilters);
    }


    this.filtersToys = arrayWithFilters;




    this.onUpdate.emit();
  }
}