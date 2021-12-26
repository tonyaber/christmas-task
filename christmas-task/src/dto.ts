import ModelToys from "./app/model/model-toys";
import Control from "./common/control";
import Page from './app/page';
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
  new(parentNode: HTMLElement, model:ModelToys): Page;
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

export interface IMap {
  x: number;
  y: number;
}


export interface IImages {
  name: string;
  num?: string;
  src: string;
  startX: number;
  startY: number;
  width: number;
  height: number;
  isMove?: boolean;
}

export interface IGarland {
  start: number;
  finish: number;
  y: number;
  radius: number;
}