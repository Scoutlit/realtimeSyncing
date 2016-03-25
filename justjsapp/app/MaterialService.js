export default class MaterialService {

  constructor() {
    this.instance = this;
  }

  upgradeElement(element) {
    componentHandler.upgradeElement(element);
  }

  static getInstance() {
    return this.instance || new MaterialService();
  }

}
