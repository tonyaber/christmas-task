import Signal from "../../common/signal";
import { IToy } from '../../dto';

export default class ModelSort{
  onUpdate: Signal<void> = new Signal();
  allToys: IToy[];
  filtersToys: IToy[];
  toys: IToy[] = [];
  selectedToy: IToy[] = [];
  isFullSelected: boolean = false;
  isEmptyList: boolean = false;
  isEmptySearch: boolean = false;
  constructor() {
    this.allToys = []
    this.filtersToys = [];   
  }

  setToys(toys:IToy[]) {
    this.allToys = toys;
    this.filtersToys = toys;
    this.toys = toys;
    this.onUpdate.emit();
  }

  getToys() {
    return this.toys;
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
        toys = toys.sort((a, b) => a.year - b.year);
        break;
      case 'descending':
        toys = toys.sort((a, b) => b.year - a.year);
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
    let arrayWithFilters:IToy[] = this.allToys;
  
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
    this.toys = this.filtersToys;
    this.isEmptyList = !arrayWithFilters.length ? true : false;
    
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

  searchToy(value: string) {
    let searchToy:IToy[] = []
    if (!value.length) {
      searchToy =this.filtersToys;
    } else {
      searchToy = this.filtersToys.filter(item => this.searchToyFilter(item, value));
    }

    this.isEmptySearch = !searchToy.length ? true : false;
    this.toys = searchToy;
    this.onUpdate.emit();
  }
  
  searchToyFilter(item:IToy, value: string) {
    const index = item.name.toLowerCase().indexOf(value.toLowerCase());
    if (index >= 0) {
      return true;
    }
    return false;
  }
}