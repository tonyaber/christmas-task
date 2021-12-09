import { IToy } from '../../dto';
import Signal from '../../common/signal';
import ModelFilter from './model-filter';
export default class ModelToys{
  toys: IToy[];
  allToys: IToy[]
  onUpdate: Signal<void> = new Signal();
  filters: { shape: { round: boolean; bell: boolean; cone: boolean; snowflake: boolean; figurine: boolean; }; color: { white: boolean; yellow: boolean; red: boolean; blue: boolean; green: boolean; }; size: { small: boolean; middle: boolean; big: boolean; }; favorite: boolean; };
  
  constructor() {
    this.toys = [];
    const modelFilter = new ModelFilter();
    this.filters = modelFilter.getFilters();
    
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
        this.onUpdate.emit(null);
      })
  }

  getAllToys() {
    return this.toys;
  }
  
  getFilters() {
    return this.filters;
  }

  changeDate(name: string, filter: string) {
    console.log(name, filter)
    let newToys = []

    for (let key in this.allToys) {
      if (this.allToys[key]['shape'] === name) {
        newToys.push(this.allToys[key]);
     }
    }
    this.toys = newToys;
   
    this.onUpdate.emit(null);
  };
}