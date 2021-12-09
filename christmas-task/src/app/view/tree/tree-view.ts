import Control from '../../../common/control';
import ModelToys from '../../model/model-toys';

export default class TreePage extends Control {
  model: ModelToys;

  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, 'main','','tree');
  }
}