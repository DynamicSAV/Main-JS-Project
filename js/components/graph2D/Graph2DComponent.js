class Graph2DComponent extends Component {
  constructor(options) {
    super(options);
    this.WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
    };

    this.UI = new UIComponent({
      id: "ui",
      parent: this.id,
      template: template.uiTemplate,
      callbacks: {
        addFunction: (f, num, start, end, check, integ, inputX) =>
          this.addFunction(f, num, start, end, check, integ, inputX),
        delFunction: (num) => this.delFunction(num),
      },
    });

    this.canvas = new Canvas({
      id: "canvas",
      WIN: this.WIN,
      width: 800,
      height: 800,
      callbacks: {
        wheel: (event) => (event.preventDefault(), this.wheel(event)),
        mouseup: () => this.mouseup(),
        mousedown: () => this.mousedown(),
        mousemove: (event) => this.mousemove(event),
      },
    });

    this.canScroll = true;
    this.funcs = [];
    this.ZOOM_STEP = 0.2;
    this.canMove = false;
    this.derivativeX = 0;
    this.render();
  }


  addFunction(f, num, start, end, check, integ, inputX) {
    this.funcs[num] = {
      f,
      color: "#f23",
      width: 3,
      start,
      end,
      check,
      integ,
      inputX,
    };
    this.render();
  }
  delFunction(num) {
    this.funcs[num] = null;
    this.render();
  }



  printOXY() {
    let gridColor = "#65b2c6";
    const { LEFT, WIDTH, HEIGHT, BOTTOM } = this.WIN;
    this.canvas.XY();

    for (let n = 0; n < WIDTH + LEFT; n++) {
      this.canvas.line(n, BOTTOM, n, BOTTOM + HEIGHT, gridColor);
      this.canvas.line(n, -0.1, n, 0.1, "black");
    }

    for (let n = 0; n > LEFT; n--) {
      this.canvas.line(n, BOTTOM, n, BOTTOM + HEIGHT, gridColor);
      this.canvas.line(n, -0.1, n, 0.1, "black");
    }

    for (let n = 0; n < BOTTOM + HEIGHT; n++) {
      this.canvas.line(LEFT, n, LEFT + WIDTH, n, gridColor);
      this.canvas.line(-0.1, n, 0.1, n, "black");
    }

    for (let n = 0; n > BOTTOM; n--) {
      this.canvas.line(LEFT, n, LEFT + WIDTH, n, gridColor);
      this.canvas.line(-0.1, n, 0.1, n, "black");
    }

    this.canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, 0.3, "black", 1);
    this.canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, -0.3, "black", 1);
    this.canvas.line(0, BOTTOM + HEIGHT, 0.3, BOTTOM + HEIGHT - 0.7, "black", 1);
    this.canvas.line(0, BOTTOM + HEIGHT, -0.3, BOTTOM + HEIGHT - 0.7, "black", 1);

    this.canvas.line(LEFT, 0, WIDTH + LEFT, 0, "black");
    this.canvas.line(0, BOTTOM, 0, BOTTOM + HEIGHT, "black");
  }

  printFunction(f) {
    var x = this.WIN.LEFT;
    var dx = 0.04;
    while (x < this.WIN.WIDTH + this.WIN.LEFT) {
      if (Math.abs(f(x) - f(x + dx)) < 100) {
        this.canvas.line(x, f(x), x + dx, f(x + dx), "red", 2, false);
        x += dx;
      } else {
        this.canvas.line(x, f(x), x + dx, f(x + dx), "red", 2, true);
        x += dx;
      }
    }
  }

  getDerivative(f, x0, dx = 0.00001) {
    return (f(x0 + dx) - f(x0)) / dx;
  }


  printDerivative(f, x0, check) {
    if (check == "true") {
      const k = this.getDerivative(f, x0);
      const b = f(x0) - k * x0;
      const x1 = this.WIN.LEFT;
      const x2 = this.WIN.LEFT + this.WIN.WIDTH;
      this.canvas.line(x1, k * x1 + b, x2, k * x2 + b, "blue", 1, true);
    } else {
      return null;
    }
  }

  getZero(f, a, b, eps) {
    if (Math.abs(f(a) - f(b)) <= eps) {
      return this.canvas.printZero((a + b) / 2);
    }
    let half = (a + b) / 2;
    if (f(a) * f(half) <= 0) {
      return this.getZero(f, a, half, eps);
    }
    if (f(half) * f(b) <= 0) {
      return this.getZero(f, half, b, eps);
    }
    if (f(a) * f(b) > 0) {
      return null;
    }
  }


  getIntegral(f, a, b, n = 100) {
    if (a === 0 && b === 0) {
      return console.log("null");
    } else {
      const dx = (b - a) / n;
      let x = a;
      let S = 0;
      while (x <= b) {
        S += ((f(x) + f(x + dx)) / 2) * dx;
        x += dx;
      }
      return S;
    }
  }

  printIntegral(f, a, b, n, integ) {
    if (integ == "true") {
      const dx = (b - a) / n;
      let x = a;
      const points = [];
      while (x < b) {
        points.push({ x, y: f(x) });
        x += dx;
      }
      points.push({ x: b, y: 0 });
      this.canvas.polygon(points);
    }
  }

  getPoint(f, inputX) {
    if (inputX || inputX == 0) {
      let y = f(inputX);
      return this.canvas.printPoint(y, inputX);
    }
  }


  render() {
    this.canvas.clear();
    this.printOXY();
    this.start;
    this.end;
    this.funcs.forEach((funcs) => {
      if (funcs) {
        this.printFunction(funcs.f, funcs.color, funcs.width);
        this.printDerivative(funcs.f, this.derivativeX, funcs.check);
        this.getZero(funcs.f, funcs.start, funcs.end, 0.0001);
        this.printIntegral(funcs.f, funcs.start, funcs.end, 100, funcs.integ);
        this.getPoint(funcs.f, funcs.inputX);
      }
    });
  }


  wheel(event) {
    var delta = event.wheelDelta > 0 ? -1 : 1;
    if (this.WIN.WIDTH + delta > 0) {
      this.WIN.WIDTH += delta;
      this.WIN.HEIGHT += delta;
      this.WIN.LEFT -= delta / 2;
      this.WIN.BOTTOM -= delta / 2;
      this.render();
    }
  }

  mousedown() {
    this.canMove = true;
  }
  mouseup() {
    this.canMove = false;
  }

  mousemove(event) {
    if (this.canMove) {
      this.WIN.LEFT -= this.canvas.sx(event.movementX);
      this.WIN.BOTTOM -= this.canvas.sy(event.movementY);
    }
    this.derivativeX = this.WIN.LEFT + this.canvas.sx(event.offsetX);
    this.render();
  }
}
