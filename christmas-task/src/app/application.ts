import Control from '../common/control';
import Header from './view/header/header-view';
import MainPage from './view/main-page/main-page-view';
import SettingPage from './view/setting/setting-view';
import ModelToys from './model/model-toys';
import TreePage from './view/tree/tree-view';
import { IMainConstructor } from '../dto';

import Page from './page';

export default class Application extends Control {
  model: ModelToys;
  currentPage: Page;
  pages: Record<string, IMainConstructor>;
  oldHash: string;
 
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.model = new ModelToys();
    const header = new Header(this.node, this.model.modelSort);

    this.pages = {
      '#main': MainPage,
      '#setting': SettingPage,
      '#tree': TreePage,
    }
    this.oldHash = 'null';      
  
    const updateWindow = () => {
     if (this.oldHash !== window.location.hash) {
        this.oldHash = window.location.hash;
        if (this.currentPage) {
          let currentPage = this.currentPage;
          this.currentPage.animateOut().then(()=>{
          currentPage.destroy();
          this.createPage()
          })
        } else {
          this.createPage().then(() => {
            console.log(1)
          })
        }
      }
    }
    window.onpopstate = updateWindow;
    updateWindow();
  }

  createPage() {
    const newPage = new (this.pages[window.location.hash] || MainPage)(this.node, this.model);
    this.currentPage = newPage;
    return newPage.animateIn();
  }

}

