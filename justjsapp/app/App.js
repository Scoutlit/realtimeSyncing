export default class App {

  constructor(id) {
    let selectorId = id || 'app';
    this.element = document.getElementById(selectorId);
    this.element.innerHTML = 'Hello World! + change';
    var button = document.createElement('button');
    var textNode = document.createTextNode('Click Me!');
    button.appendChild(textNode);
    button.className = 'mdl-button mdl-js-button mdl-js-ripple-effect';
    componentHandler.upgradeElement(button);
    this.element.appendChild(button);
    button.addEventListener('click', (e) => {
      console.log('event', e)
    })
  }

}
