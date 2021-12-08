import Control from '../common/control';
import Header from './view/header/header-view';
import MainPage from './view/main-page/main-page-view';
import SettingPage from './view/setting/setting-view';

export default class Application extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode);

    const header = new Header(this.node);
    const main = new MainPage(this.node);
    main.onStartButtonClick = () => {
      main.destroy();
      const setting = new SettingPage(this.node);
    }


  }
}