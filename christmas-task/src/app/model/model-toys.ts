import { IToy } from '../../dto';
export default class ModelToys{
  toys: IToy[];
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
      .then(res=>this.toys = res)
  }

  getAllToys() {
    return this.toys;
  }
}