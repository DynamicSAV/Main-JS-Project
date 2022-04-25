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
    this.cmd = false;
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

    const inputTangent = document.createElement("input");
    inputTangent.setAttribute("type", "checkbox");
    inputTangent.setAttribute("class", "inputTangentCheckbox");


    const button = document.createElement("button");
    button.innerHTML = "Удалить";
    button.className = "deleteFunc";
    button.addEventListener("click", () => {
      this.callbacks.delFunction(input.dataset.num);
      funcsField.removeChild(input);
      funcsField.removeChild(button);
      funcsField.removeChild(inputTangent);
    });

    // const checkbox = document.createElement("input");
    // checkbox.setAttribute("type", "checkbox");
    // checkbox.setAttribute("id", "tangentLine");
    


    const funcsField = document.getElementById("funcsField");
    funcsField.appendChild(input);
    funcsField.appendChild(button);
    funcsField.appendChild(inputTangent);
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
