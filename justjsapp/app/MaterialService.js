let instance = null;

export default class MaterialService {

  constructor() {
    instance = this;
  }

  upgradeElement(element) {
    componentHandler.upgradeElement(element);
  }

  static getInstance() {
    return instance || new MaterialService();
  }

}
