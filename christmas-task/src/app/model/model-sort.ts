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
  
  filtersData(value: string|boolean, toys:IToy[]) {
    if (value === 'favorite') {
      value = true;
    }
    const newToys :IToy[]= [];
    for (let key in toys) {
      for (let filter in toys[key]) {
        //console.log(this.toys[key][filter as keyof IToy],value)
        if (toys[key][filter as keyof IToy] === value) {
          newToys.push(toys[key]);
        }
       // console.log(toys[key][filter as keyof IToy])
      }
    }
    
    return newToys;
    //this.onUpdate.emit();
  }  
  
  changeSort(filters:Record<string, Record<string, boolean>>) {
    this.filtersToys =[];
    let arrayWithFilters:IToy[] = this.toys;
    
    //console.log(filters)
    const checkedFilters = [];
    for (let key in filters) {
      let arrayArrayWithAllFilters: IToy[] = [];
      let isFilter = false;
      for (let value in filters[key]) {
        if (filters[key][value]) {
          isFilter = true;
          arrayArrayWithAllFilters = arrayArrayWithAllFilters.concat(this.filtersData(value, arrayWithFilters));
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