import Signal from "../../common/signal";
import { IToy } from '../../dto';

export default class ModelTree{
  selectedToy: IToy[] = [];
  allToys: IToy[];
  background: number = 1;
  tree: number = 1;
  onUpdate: Signal<void> = new Signal();
  onDrop: Signal<void> = new Signal();
  onUpdateToy: Signal<void> = new Signal();
  onUpdateTree:  Signal<void> = new Signal();

  setSelectedToy(value:IToy[]) {
    this.selectedToy = value;
  }

  setAllToys(toys: IToy[]) {
    this.allToys = toys;
    this.onUpdateToy.emit();
  }

  setDrop(id: string, value: boolean) {
    if (value) {
      this.selectedToy.find(toy => toy.num == id).count--;
    } else {
      this.selectedToy.find(toy => toy.num == id).count++;
    }
    this.onDrop.emit();
  }

  getToys() {
    if (this.selectedToy.length) {
      return this.selectedToy
    }
    this.selectedToy = this.allToys.slice(0, 20);
    return this.selectedToy;
  }

  setBg(value: number) {
    this.background = value;
    this.onUpdate.emit();
  }

  setTree(value: number) {
    this.tree = value;    
    this.onUpdate.emit();
    this.onUpdateTree.emit();
  }


}