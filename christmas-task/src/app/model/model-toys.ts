import { IToy, IFilter } from '../../dto';
import Signal from '../../common/signal';
import ModelFilter from './model-filter';
import ModelSort from './model-sort';
export default class ModelToys{
  toys: IToy[];
  allToys: IToy[]
  onUpdate: Signal<void> = new Signal();
  filters: Record<string, Record<string, boolean>>;
  modelFilter: ModelFilter;
  modelSort: ModelSort;
  
  constructor() {
    this.toys = [];

    this.modelFilter = new ModelFilter();
    this.modelFilter.onUpdate.add(
      () => {      
        this.modelSort.changeSort( this.modelFilter.filters);
      }
    );

    this.modelSort = new ModelSort();
    this.filters = this.modelFilter.getFilters();
      
    this.setAllToys();
  }
  

  setAllToys() {
    fetch('../data/data.json')
      .then(json => json.json())
      .then(res => {
        for (const key in res) {
          res[key]['year'] = Number(res[key]['year']);
          res[key]['count'] = Number(res[key]['count']);
        }
        return res;
      })
      .then(res => {
        this.toys = res;
        this.allToys = res;
        this.modelSort.setToys(res)
        this.onUpdate.emit(null);
      })
  }

  getAllToys() {
    return this.toys;
  }
  
  getFilters() {
    return this.filters;
  }

  changeData(name: string, filter:string, isChecked: boolean) {
    let newToys = [];
    console.log(1)
    
    //this.modelFilter.changeFilter(filter, name, isChecked)
    //this.modelFilter.changeFilter(filter, name);

    // for (let key in this.allToys) {
    //   if (this.allToys[key][filter as keyof IToy] === name) {
    //     newToys.push(this.allToys[key]);
    //   }else if (this.allToys[key][filter as keyof IToy] === true) {
    //     newToys.push(this.allToys[key]);
    //   }
    // }
    // this.toys = newToys;
   
    //this.onUpdate.emit(null);
  };
}