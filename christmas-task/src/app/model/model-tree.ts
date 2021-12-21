import Signal from "../../common/signal";
import { IToy } from '../../dto';

export default class ModelTree{
  selectedToy: IToy[] = [];
  allToys: IToy[];
  background: number = 1;
  tree: number = 1;
  onUpdate: Signal<void> = new Signal();

  setSelectedToy(value:IToy[]) {
    this.selectedToy = value;
  }

  setAllToys(toys: IToy[]) {
    this.allToys = toys;
  }

  getToys() {
    if (this.selectedToy.length) {
      return this.selectedToy
    }
    return this.allToys.slice(0, 20);
  }

  setBg(value: number) {
    this.background = value;
    this.onUpdate.emit();
  }

  setTree(value: number) {
    this.tree = value;
    this.onUpdate.emit();
  }


}