import Signal from "../../common/signal";
import { IToy } from '../../dto';

export default class ModelSort{
  onUpdate: Signal<void> = new Signal();
  allToys: IToy[];
  filtersToys: IToy[];
  toys: IToy[] = [];
  selectedToy: IToy[] = [];
  isEmptyList = false;
  isEmptySearch = false;
  onOverFlow: Signal<void> = new Signal();
  onSelectToy: Signal<void> = new Signal();
  constructor() {
    this.allToys = []
    this.filtersToys = []; 
   // this.getSelectedToyInLocalStorage()
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
  
    for (const key in filters) {
      let arrayArrayWithAllFilters: IToy[] = [];
      let isFilter = false;
      for (const value in filters[key]) {
        if (filters[key][value]) {
          isFilter = true;
          arrayArrayWithAllFilters = arrayArrayWithAllFilters.concat(this.filtersDataByValue(key,value, arrayWithFilters));
        }
      }
      if (isFilter) {
        arrayWithFilters = arrayArrayWithAllFilters;
      }
      
    }   
    for (const key in range) {
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
      if (this.selectedToy.length < 20) {  
        this.allToys.find(item => item.num === toy.num).isSelected = !isSelected;
        this.filtersToys.find(item => item.num === toy.num).isSelected = !isSelected;
        this.selectedToy.push(toy); 
         this.onSelectToy.emit();
      } else {        
        this.onOverFlow.emit();
      }      
    } else {
      this.allToys.find(item => item.num === toy.num).isSelected = !isSelected;
      this.filtersToys.find(item => item.num === toy.num).isSelected = !isSelected;
      this.selectedToy= this.selectedToy.filter(item => item.num !== toy.num);
      this.onSelectToy.emit();
    } 
    //this.setToysInLocalStorage();
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
   setToysInLocalStorage() {
     localStorage.setItem('tonyaber-toys', JSON.stringify(this.allToys));
     localStorage.setItem('tonyaber-selected-toy', JSON.stringify(this.selectedToy))
  }

  getSelectedToyInLocalStorage() {
    if (localStorage.getItem('tonyaber-selected-toy')) {
      this.selectedToy = JSON.parse(localStorage.getItem('tonyaber-selected-toy'));
    }
  }
  
}