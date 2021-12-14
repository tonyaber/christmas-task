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
  year: number;
  isSelected: boolean;
}

export interface IMainConstructor{
  new(parentNode: HTMLElement, model:ModelToys): Control;
}

export interface IFilter  {
  shape: {
    round: boolean;
    bell: boolean; 
    cone: boolean;
    snowflake: boolean;
    figurine: boolean;
  }; 
  color: {
    white: boolean;
    yellow: boolean;
    red: boolean;
    blue: boolean;
    green: boolean;
  }; 
  size: {
    small: boolean;
    middle: boolean;
    big: boolean;
  };
  favorite: {
    favorite: boolean,
  };
};