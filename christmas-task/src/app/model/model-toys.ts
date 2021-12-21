import { IToy, IFilter } from '../../dto';
import Signal from '../../common/signal';
import ModelFilter from './model-filter';
import ModelSort from './model-sort';
import ModelTree from './model-tree';
export default class ModelToys{
  toys: IToy[];
  allToys: IToy[] = [];
  onUpdate: Signal<void> = new Signal();
  filters: Record<string, Record<string, boolean>>;
  modelFilter: ModelFilter;
  modelSort: ModelSort;
  modelTree: ModelTree;
  
  constructor() {
    this.toys = [];

    this.modelFilter = new ModelFilter();
    this.modelSort = new ModelSort();
    this.modelTree = new ModelTree();

    this.modelFilter.onUpdate.add(
      () => {      
        this.modelSort.changeData( this.modelFilter.filters, this.modelFilter.range, this.modelFilter.sort);
      }
    );

    this.modelSort.onSelectToy.add(
      () => {
        this.modelTree.setSelectedToy(this.modelSort.selectedToy)
      }
    )

    this.onUpdate.add(() => {
      this.modelSort.changeData( this.modelFilter.filters, this.modelFilter.range, this.modelFilter.sort);
    })

    this.filters = this.modelFilter.getFilters();
    this.setAllToys();
  }

  setAllToys() {
    fetch('data/data.json')
      .then(json => json.json())
      .then(res => {
        ////функция загрузки данных с локалстроридж
        for (const key in res) {
          res[key]['year'] = Number(res[key]['year']);
          res[key]['count'] = Number(res[key]['count']);
          
          res[key]['isSelected'] = false;
        }
        return res;
      })
      .then(res => {
        this.toys = res;
        this.allToys = res;
        this.modelSort.setToys(res);
        this.modelTree.setAllToys(res);
        this.onUpdate.emit();
      })
  } 
}