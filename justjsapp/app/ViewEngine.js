import _ from 'lodash';

let instance = null;

export default class ViewEngine {

  constructor() {
    instance = this;
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

  querySelector(selector, target) {
    var trg = target || document;
    return trg.querySelector(selector);
  }

  createElement(selector) {
    return document.createElement(selector);
  }

  getId() {
    return this.id++;
  }

  static getInstance() {
    return instance || new ViewEngine();
  }

}
