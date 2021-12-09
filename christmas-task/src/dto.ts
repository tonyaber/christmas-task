import ModelToys from "./app/model/model-toys";
import Control from "./common/control";

export interface IToy{
  color: string;
  count: number;
  favorite: boolean;
  name: string;
  num: string;
  shape: string;
  size: string;
  year: string;
}

export interface IMainConstructor{
  new(parentNode: HTMLElement, model:ModelToys): Control;
}