export default class PopUp {
  constructor() {
    this.popup = $(document.querySelector('#main-popup'))
  }

  savePasswordSuggestion(data) {
    debugger
    this.popup.append(<div>{JSON.stringify(data)}</div>)
  }
}