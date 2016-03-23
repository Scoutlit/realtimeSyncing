class App {

  constructor(id) {
    let selectorId = id || 'app';
    this.element = document.getElementById('main');
    this.element.innerHTML = 'Hello World!';
  }

}

export default App;
