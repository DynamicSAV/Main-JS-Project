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
    this.num = 1;
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
    inputTangent.setAttribute("class", `inputTangentCheckbox${this.num}`);

    const range = document.createElement("input");
    range.setAttribute("type", "range");
    range.setAttribute("min", "1");
    range.setAttribute("max", "15");
    range.setAttribute("value", "2");
    range.setAttribute("class", `funcWidthRange${this.num}`);

    const colorInput = document.createElement("input");
    colorInput.setAttribute("type", "color");
    colorInput.style.width = 24;
    colorInput.style.height = 24;
    colorInput.setAttribute("class", `colorValue${this.num}`);

    const button = document.createElement("button");
    button.innerHTML = "Удалить";
    button.className = "deleteFunc";
    button.addEventListener("click", () => {
      this.callbacks.delFunction(input.dataset.num);
      funcsField.removeChild(input);
      funcsField.removeChild(button);
      funcsField.removeChild(range);
      funcsField.removeChild(colorInput);
      funcsField.removeChild(inputTangent);
    });

    const funcsField = document.getElementById("funcsField");
    funcsField.appendChild(input);
    funcsField.appendChild(button);
    funcsField.appendChild(range);
    funcsField.appendChild(colorInput);
    funcsField.appendChild(inputTangent);
    this.num++;
  }

  keyup(input) {
    try {
      let f;
      eval(`f = function(x) { return ${input.value}; }`);
      this.callbacks.addFunction(
        f,
        input.dataset.num,
        null,
        null,
        false,
        null,
        null,
        this.num
      );
    } catch (e) {}
  }
}
