class Graph3DComponent extends Component {
  constructor(options) {
    super(options);
    this.WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
      CAMERA: new Point(0, 0, 50),
      DISPLAY: new Point(0, 0, 30),
    };
    this.figures = [];
    this.figureColor = document.getElementById("colorSelector");
    this.Canvas3D = new Canvas({
      id: "Canvas3D",
      WIN: this.WIN,
      width: 800,
      height: 800,
      callbacks: {
        wheel: (event) => this.wheel(event),
        mouseup: (event) => this.mouseup(event),
        mousedown: (event) => this.mousedown(event),
        mousemove: (event) => this.mousemove(event),
      },
    });
    this.Graph3D = new Graph3D({
      WIN: this.WIN,
    });
    //this.render();
    this.LIGHT = new Light(0, 10, 10, 50000);
    this.dx = 0;
    this.dy = 0;
    this.canRotate = false;
    //Освещение
    this.lightChanger = true;
    //Видимость элементов фигуры
    this.vertexChanger = false;
    this.edgesChanger = true;
    this.polygonsChanger = true;
    //Выбор цвета
    this.color = document.getElementById("colorSelector");
    //FPS
    let FPS = 0;
    this.FPS = 0;
    let lastTimestamp = Date.now();

    const animLoop = () => {
      FPS++;
      const timestamp = Date.now();
      if (timestamp - lastTimestamp >= 1000) {
        this.FPS = FPS;
        FPS = 0;
        lastTimestamp = timestamp;
      }
      this.render();
      requestAnimationFrame(animLoop);
    };
    animLoop();
  }

  _addEventListeners() {
    document
      .getElementById("deleteAllObjects")
      .addEventListener("click", () => {
        this.figures = [];
        this.render();
      });
    document.addEventListener("keydown", (event) => {
      this.keyDownHandler(event);
    });
    const addElemBtn = document.querySelectorAll(".addElem");
    addElemBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        switch (elem.dataset.figure) {
          case "Cube":
            return this.figures.push(new figure().Cube(this.color.value));
          case "Sphere":
            return this.figures.push(
              new figure().Sphere(10, 20, this.color.value)
            );
          case "Tor":
            console.log(new figure().Tor(10, 5, 20, this.color.value));
            return this.figures.push(
              new figure().Tor(10, 5, 20, this.color.value)
            );
        }
      });
    });
    document.getElementById("vertexView").addEventListener("click", () => {
      this.vertexViewChange();
    });
    document.getElementById("edgesView").addEventListener("click", () => {
      this.edgesViewChange();
    });
    document.getElementById("polygonsView").addEventListener("click", () => {
      this.polygonsViewChange();
    });
    document.getElementById("lightButton").addEventListener("click", () => {
      this.lightInclusionChanger();
    });
  }

  vertexViewChange() {
    this.vertexChanger = !this.vertexChanger;
    this.render();
  }
  edgesViewChange() {
    this.edgesChanger = !this.edgesChanger;
    this.render();
  }
  polygonsViewChange() {
    this.polygonsChanger = !this.polygonsChanger;
    this.render();
  }
  lightInclusionChanger() {
    this.lightChanger = !this.lightChanger;
    this.render();
  }

  // createFigure(parametrs = "") {
  //   this.figures.push(eval(parametrs));
  //   this.render();
  // }

  wheel(event) {
    const delta = event.wheelDelta > 0 ? 1.1 : 0.9;
    this.figures.forEach((figure) => {
      figure.points.forEach((point) => this.Graph3D.zoom(delta, point));
    });
    this.render();
  }

  mousedown(event) {
    this.canRotate = true;
    this.dx = event.offsetX;
    this.dy = event.offsetY;
  }
  mouseup(event) {
    this.canRotate = false;
    this.dx = event.offsetX;
    this.dy = event.offsetY;
  }

  mousemove(event) {
    if (this.canRotate) {
      const gradus = Math.PI / 180 / 4;
      this.figures.forEach((figure) => {
        figure.points.forEach((point) => {
          this.Graph3D.rotateOx((this.dy - event.offsetY) * gradus, point);
          this.Graph3D.rotateOy((this.dx - event.offsetX) * gradus, point);
        });
      });
      this.dx = event.offsetX;
      this.dy = event.offsetY;
      this.render();
    }
  }

  moveScene(figure, dx, dy, dz) {
    const matrix = this.Graph3D.moveOx(dx, dy, dz);
    figure.points.forEach((point) => {
      const array = this.Graph3D.multMatrix(matrix, [
        point.x,
        point.y,
        point.z,
        1,
      ]);
      point.x = array[0];
      point.y = array[1];
      point.z = array[2];
    });
    this.render();
  }
  keyDownHandler(event) {
    this.figures.forEach((figure) => {
      switch (event.keyCode) {
        case 65:
          return this.moveScene(figure, -1, 0, 0); //Влево
        case 68:
          return this.moveScene(figure, 1, 0, 0); //Вправо
        case 87:
          return this.moveScene(figure, 0, 1, 0); //Вверх
        case 83:
          return this.moveScene(figure, 0, -1, 0); //Вниз
      }
    });
  }

  render() {
    this.Canvas3D.clear();
    if (this.polygonsChanger) {
      this.allPolygons = [];
      this.figures.forEach((figure, index) => {
        this.Graph3D.calcDistance(figure, this.WIN.CAMERA, "distance");
        this.Graph3D.calcDistance(figure, this.LIGHT, "lumen");
        figure.polygons.forEach((polygon) => {
          polygon.figureIndex = index;
          this.allPolygons.push(polygon);
        });
      });
      this.Graph3D.sortByArtistAlgorithm(this.allPolygons);
      this.allPolygons.forEach((polygon) => {
        const figure = this.figures[polygon.figureIndex];
        const points = polygon.points.map((point) => {
          return {
            x: this.Graph3D.xs(figure.points[point]),
            y: this.Graph3D.ys(figure.points[point]),
          };
        });
        const lumen = this.Graph3D.calcIllumination(
          polygon.distance,
          this.LIGHT.lumen
        );
        let { r, g, b } = polygon.color;
        r = Math.round(r * lumen);
        g = Math.round(g * lumen);
        b = Math.round(b * lumen);
        this.Canvas3D.polygon(points, polygon.rgbToHex(r, g, b));
      });
    }
    this.figures.forEach((figure) => {
      if (this.edgesChanger) {
        figure.edges.forEach((edge) => {
          const point1 = figure.points[edge.p1];
          const point2 = figure.points[edge.p2];
          this.Canvas3D.line(
            this.Graph3D.xs(point1),
            this.Graph3D.ys(point1),
            this.Graph3D.xs(point2),
            this.Graph3D.ys(point2)
          );
        });
      }
      if (this.vertexChanger) {
        figure.points.forEach((point) => {
          let x = this.Graph3D.xs(point);
          let y = this.Graph3D.ys(point);
          this.Canvas3D.printPoint(x, y);
        });
      }
    });
    this.Canvas3D.text(`FPS = ${this.FPS}`, -9, 9, 18);
  }
}
