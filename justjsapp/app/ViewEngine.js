import _ from 'lodash';

export default class ViewEngine {

  constructor() {
    this.instance = this;
    this.id = 1;
  }

  getElement(selector) {
    let elements = document.getElementsByTagName(selector);

    let element = _.find(elements, (e) => {
      return !e._appId;
    });

    if (!element) {
      throw new Error('Element ' + selector + ' cannot be found');
    }

    element._appId = this.getId();
    return element;
  }

  getId() {
    return this.id++;
  }

  static getInstance() {
    return this.instance || new ViewEngine();
  }

}
