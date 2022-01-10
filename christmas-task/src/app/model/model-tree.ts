import Signal from "../../common/signal";
import { IImages, IToy } from '../../dto';

export default class ModelTree{
  selectedToy: IToy[] = [];
  allToys: IToy[];
  background = 1;
  tree = 1;
  onUpdate: Signal<void> = new Signal();
  onDrop: Signal<void> = new Signal();
  onUpdateToy: Signal<void> = new Signal();
  onUpdateTree: Signal<void> = new Signal();
  onUpdateGarland: Signal<void> = new Signal();
  onUpdateSnow:  Signal<void> = new Signal();
  onUpdateMusic: Signal<void> = new Signal();
  onSaveTree: Signal<void> = new Signal();
  onUpdateSaveTree: Signal<void> = new Signal();
  onUpdateCanvas: Signal<void> = new Signal();
  garland = 'yellow';
  isSnow = false;
  isMusic = false;
  canvasImage: IImages[][] = [];
  actualTree: IImages[];

  constructor() {
    this.getLocalStorage();
  }

  setSelectedToy(value:IToy[]) {
    this.selectedToy = JSON.parse(JSON.stringify(value));
    this.onUpdateToy.emit();
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
    if (!this.allToys) {
      return [];
    }
    if (this.selectedToy.length) {
      return this.selectedToy;
    }
    this.selectedToy = JSON.parse(JSON.stringify(this.allToys.slice(0, 20)));
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

  setGarland(value: string) {
    this.garland = value;
    this.onUpdateGarland.emit();
  }

  setMusic(isChecked: boolean) {
    this.isMusic = isChecked;
    this.onUpdateMusic.emit();
    localStorage.setItem('tonyaber-music', JSON.stringify(isChecked));

  }

  setSnow(isChecked: boolean) {
    this.isSnow = isChecked;
    this.onUpdateSnow.emit();
    localStorage.setItem('tonyaber-snow', JSON.stringify(isChecked));
  }

  onSaveButtonClick() {    
    this.onSaveTree.emit();
  }

  saveTree(value: IImages[]) {
    this.actualTree = value;
    this.canvasImage.push(JSON.parse(JSON.stringify(value)));
    this.tree = 1;
    this.background = 1;
    this.onUpdateSaveTree.emit();
    localStorage.setItem('tonyaber-tree', JSON.stringify(this.canvasImage))
  }

  changeCanvas(data: IImages[], garland: string) {
    this.actualTree = data;
    this.garland = garland;
    this.onUpdateCanvas.emit();
  }

  clearLocalStorage() {
    localStorage.clear();    
  }

  getLocalStorage() {
    if (localStorage.getItem('tonyaber-snow')) {
      this.isSnow = JSON.parse(localStorage.getItem('tonyaber-snow'));
    }
    if (localStorage.getItem('tonyaber-music')) {
      this.isMusic = JSON.parse(localStorage.getItem('tonyaber-music'));
    }
    if (localStorage.getItem('tonyaber-tree')){
      this.canvasImage = JSON.parse(localStorage.getItem('tonyaber-tree'));
    }
  }

}