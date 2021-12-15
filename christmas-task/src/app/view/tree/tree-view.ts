import Control from '../../../common/control';
import ModelToys from '../../model/model-toys';
import  Page  from '../../page';

export default class TreePage extends Page {
  model: ModelToys;

  constructor(parentNode: HTMLElement, model: ModelToys) {
    super(parentNode, 'tree');
  }
}