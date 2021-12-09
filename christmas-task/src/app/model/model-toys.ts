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
      .then(res=>this.toys = res)
  }

  getAllToys() {
    return this.toys;
  }
}