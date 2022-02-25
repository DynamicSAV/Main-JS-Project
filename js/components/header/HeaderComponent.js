class HeaderComponent extends Component {
  _addEventListeners() {
    const buttons = document.querySelectorAll(".showPage");
    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        this.showPage(button.dataset.component)
      );
    });
  }

  showPage(name) {
    this.callbacks.showPage(name);
  }
}
