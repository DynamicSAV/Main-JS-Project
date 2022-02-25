function sin(x) {
  return Math.sin(x);
}
function cos(x) {
  return Math.cos(x);
}
function tg(x) {
  return Math.tan(x);
}

class UIComponent extends Component {
  constructor(options) {
    super(options);
    this.num = 0;
  }

  _addEventListeners() {
    document
      .getElementById("addFunction")
      .addEventListener("click", () => this.addFunction());
  }

  addFunction() {
    const input = document.createElement("input");
    input.setAttribute("placeholder", `функция №${this.num}`);
    input.dataset.num = this.num;
    input.addEventListener("keyup", () => this.keyup(input));

    const checkbox = document.createElement("checkbox");

    const button = document.createElement("button");
    button.innerHTML = "Удалить";
    button.className = "deleteFunc";
    button.addEventListener("click", () => {
      this.callbacks.delFunction(input.dataset.num);
      funcsField.removeChild(input);
      funcsField.removeChild(button);
    });

    const funcsField = document.getElementById("funcsField");
    funcsField.appendChild(input);
    funcsField.appendChild(button);
    this.num++;
  }

  keyup(input) {
    try {
      let f;
      eval(`f = function(x) { return ${input.value}; }`);
      this.callbacks.addFunction(f, input.dataset.num);
    } catch (e) {}
  }
}
