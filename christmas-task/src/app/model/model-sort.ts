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
  
  filtersData(key: string, value: string | boolean, toys: IToy[]) {
    let newToys: IToy[] = [];
    if (value === 'favorite') {
      newToys = toys.filter(item => item[key as keyof IToy]===true)
    } else {
      newToys = toys.filter(item => item[key as keyof IToy]===value)
    }    
    return newToys;
  }  
  
  changeData(filters:Record<string, Record<string, boolean>>, range: Record<string, Record<string, number>>) {
    this.filtersToys =[];
    let arrayWithFilters:IToy[] = this.toys;
    
    const checkedFilters = [];
    for (let key in filters) {
      let arrayArrayWithAllFilters: IToy[] = [];
      let isFilter = false;
      for (let value in filters[key]) {
        if (filters[key][value]) {
          isFilter = true;
          arrayArrayWithAllFilters = arrayArrayWithAllFilters.concat(this.filtersData(key,value, arrayWithFilters));
        }
      }
      if (isFilter) {
        arrayWithFilters = arrayArrayWithAllFilters;
      }
      
    }   
    this.filtersToys = arrayWithFilters;


    this.onUpdate.emit();
  }
}