export default class ModelFilter{
  filters: { shape: { round: boolean; bell: boolean; cone: boolean; snowflake: boolean; figurine: boolean; }; color: { white: boolean; yellow: boolean; red: boolean; blue: boolean; green: boolean; }; size: { small: boolean; middle: boolean; big: boolean; }; favorite: boolean; };
  constructor() {
    this.filters = {
      'shape': {
        'round': false,
        'bell': false,
        'cone': false,
        'snowflake': false,
        'figurine': false,
      },
      'color': {
        'white': false,
        'yellow': false,
        'red': false,
        'blue': false,
        'green': false,
      },
      'size': {
        'small': false,
        'middle': false,
        'big': false,
      },
      'favorite': false
    }
  }
  getFilters() {
    return this.filters;
  }
}