class Graph2DComponent extends Component {
  constructor(options) {
    super(options);
    this.WIN = {
      LEFT: -10,
      BUTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
    };
    this.canvas = new Canvas({
      WIN: this.WIN,
      id: "canvas",
      width: 800,
      height: 800,
      callbacks: {
        wheel: (event) => this.wheel(event),
        mouseup: () => this.mouseup(),
        mousedown: () => this.mousedown(),
        mousemove: (event) => this.mousemove(event),
        mouseleave: () => this.mouseleave(),
      },
    });
    new UIComponent({
      id: "ui",
      parent: this.id,
      template: template.uiTemplate,
      callbacks: {
        addFunction: (f, num) => this.addFunction(f, num),
        delFunction: (num) => this.delFunction(num),
      },
    });

    this.funcs = [];
    this.ZOOM_STEP = 0.8;
    this.canMove = false;
    this.derivativeX = 0;

    this.render();
  }

  addFunction(f, num) {
    this.funcs[num] = {
      f,
      color: "#f23",
      width: 3,
    };
    this.render();
  }
  delFunction(num) {
    this.funcs[num] = null;
    this.render();
  }

  mousedown() {
    this.canMove = true;
  }
  mouseup() {
    this.canMove = false;
  }
  mouseleave() {
    this.canMove = false;
  }
  mousemove(event) {
    if (this.canMove) {
      this.WIN.LEFT -= this.canvas.sx(event.movementX);
      this.WIN.BUTTOM -= this.canvas.sy(event.movementY);
    }
    this.derivativeX = this.WIN.LEFT + this.canvas.sx(event.offsetX);
    this.render();
  }

  wheel(event) {
    const delta = event.wheelDelta > 0 ? -this.ZOOM_STEP : this.ZOOM_STEP;
    if (this.WIN.WIDTH + delta > 2) {
      this.WIN.WIDTH += delta;
      this.WIN.HEIGHT += delta;
      this.WIN.LEFT -= delta / 2;
      this.WIN.BUTTOM -= delta / 2;
      this.render();
    }
  }

  getZero(f, a, b, eps) {
    if (f(a) * f(b) > 0) {
      return null;
    }
    if (Math.abs(f(a) - f(b)) <= eps) {
      return (a + b) / 2;
    }
    const half = (a + b) / 2;
    if (f(a) * f(half) <= 0) {
      return getZero(f, a, half, eps);
    }
    if (f(half) * f(b) <= 0) {
      return getZero(f, a, half, eps);
    }
  }

  getDerivative(f, x0, dx = 0.00001) {
    return (f(x0 + dx) - f(x0)) / dx;
  }

  // y = k*x + b
  printDerivative(f, x0, dx) {
    const k = this.getDerivative(f, x0, dx);
    const b = f(x0) - k * x0;
    const x1 = this.WIN.LEFT;
    const x2 = this.WIN.LEFT + this.WIN.WIDTH;
    this.canvas.line(x1, k * x1 + b, x2, k * x2 + b, "blue", 1, true);
  }

  printOXY() {
    let gridColor = "#65b2c6";
    const { LEFT, WIDTH, BUTTOM, HEIGHT } = this.WIN;
    for (let i = 0; i < WIDTH + LEFT; i++) {
      //от 0 до 10
      this.canvas.line(i, BUTTOM, i, BUTTOM + HEIGHT, gridColor); //провести линию от 0 до -10 по y; провести линию от 0 до 10  по y
      this.canvas.line(i, -0.1, i, 0.1, "black");
    }
    for (let i = 0; i > LEFT; i--) {
      //от 0 до -10 по x
      this.canvas.line(i, BUTTOM, i, BUTTOM + HEIGHT, gridColor); // провести линию от 0 до -10 по y; провести линию от 0 до 10  по y
      this.canvas.line(i, -0.1, i, 0.1, "black");
    }
    for (let i = 0; i < HEIGHT + BUTTOM; i++) {
      //от 0 до 10
      this.canvas.line(LEFT, i, LEFT + WIDTH, i, gridColor); //провести линию от -10 до 0 по x; провести линию от 10 до 0  по x
      this.canvas.line(-0.1, i, 0.1, i, "black");
    }
    for (let i = 0; i > BUTTOM; i--) {
      //от 0 до -10
      this.canvas.line(LEFT, i, LEFT + WIDTH, i, gridColor); //провести линию от -10 до 0 по x; провести линию от 10 до 0  по x
      this.canvas.line(-0.1, i, 0.1, i, "black");
    }
    //Стрелочки
    this.canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.6, -0.2, "black");
    this.canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.6, 0.2, "black");
    this.canvas.line(0, BUTTOM + HEIGHT, -0.2, BUTTOM + HEIGHT - 0.6, "black");
    this.canvas.line(0, BUTTOM + HEIGHT, 0.2, BUTTOM + HEIGHT - 0.6, "black");

    this.canvas.line(LEFT, 0, WIDTH + LEFT, 0, "black"); //Ось OX
    this.canvas.line(0, BUTTOM, 0, BUTTOM + HEIGHT, "black"); //Ось OY
  }
  printCircle() {}

  printFunction(f) {
    let x = this.WIN.LEFT;
    const dx = this.WIN.WIDTH / 100;
    while (x < this.WIN.LEFT + this.WIN.WIDTH) {
      try {
        this.canvas.line(x, f(x), x + dx, f(x + dx));
      } catch (e) {}
      x += dx;
    }
  }
  //Интегралы
  getIntegral(f, a, b, n = 100) {
    const dx = (b - a) / n;
    let x = a;
    let s = 0;
    while (x <= b) {
      s += f(x) + (f(x + dx) / 2) * dx;
      x += dx;
    }
    return s;
  }
  printIntegral(f, a, b, n = 100) {
    const dx = (b - a) / n;
    let x = a;
    const points = [];
    points.push({ x, y: 0 });
    while (x <= b) {
      points.push({ x, y: f(x) });
      x += dx;
    }
    points.push({ x: b, y: 0 });
    this.canvas.polygon(points);
  }

  render() {
    this.canvas.clear();
    this.printOXY();
    this.funcs.forEach((func) => {
      if (func) {
        this.printFunction(func.f, func.color, func.width);
        if (cb.checked) {
          this.printDerivative(func.f, this.derivativeX);
        }
      }
    });
  }
}
