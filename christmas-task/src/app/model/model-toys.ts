import { IToy } from '../../dto';
import Signal from '../../common/signal';
export default class ModelToys{
  toys: IToy[];
  allToys: IToy[]
  onUpdate: Signal<void> = new Signal();
  constructor() {
    this.toys = [];
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

  changeDate(name: string, filter: string) {
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