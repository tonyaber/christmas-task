import Signal from "../../common/signal";
import { IToy } from '../../dto';

export default class ModelSort{
  onUpdate: Signal<void> = new Signal();
  toys: IToy[];
  filtersToys: IToy[];
  selectedToy: IToy[] = [];
  isFullSelected: boolean = false;
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

  sortArray(toys: IToy[], sort:string) {
    switch (sort) {
      case 'a-z':
        toys = toys.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        toys = toys.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'ascending':
        toys = toys.sort((a, b) => a.count - b.count);
        break;
      case 'descending':
        toys = toys.sort((a, b) => b.count - a.count);
        break;  
    }
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
  
  changeData(filters:Record<string, Record<string, boolean>>, range: Record<string, Record<string, number>>, sort: string) {
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

    this.sortArray(arrayWithFilters, sort);

    this.filtersToys = arrayWithFilters;
    this.onUpdate.emit();
  }

  selectToy(toy: IToy) { 
    
    const isSelected = toy.isSelected;
    if (!isSelected) {
      if (this.selectedToy.length < 4) {
        this.isFullSelected = false;
        this.filtersToys.find(item => item.num === toy.num).isSelected = !isSelected;
        this.selectedToy.push(toy); 
      } else {
        this.isFullSelected = true;
      }             
    } else {
      this.isFullSelected = false;
      this.filtersToys.find(item => item.num === toy.num).isSelected = !isSelected;
      this.selectedToy= this.selectedToy.filter(item => item.num !== toy.num);
    }  
    
    this.onUpdate.emit();
  }
}