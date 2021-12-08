import Control from '../common/control';
import Header from './view/header/header-view';
import MainPage from './view/main-page/main-page-view';
import SettingPage from './view/setting/setting-view';

export default class Application extends Control {
  view: MainPage | SettingPage;

  constructor(parentNode: HTMLElement) {
    super(parentNode);

    const header = new Header(this.node);
    header.onMainPageClick = () => {
      this.view.destroy();
      this.setMainPage()
    }

    header.onSettingPageClick = () => {
      this.view.destroy();
      this.view = new SettingPage(this.node);
    }

    this.setMainPage();
  }

  setMainPage(){
    const main = new MainPage(this.node);
    this.view = main;
    main.onStartButtonClick = () => {
      this.view.destroy();
      this.view = new SettingPage(this.node);
    }
  }
}