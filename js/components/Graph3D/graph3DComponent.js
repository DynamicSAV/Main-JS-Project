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
    this.Canvas3D = new Canvas({
      id: "Canvas3D",
      WIN: this.WIN,
      width: 800,
      height: 800,
      callbacks: {
        wheel: (event) => this.wheel(event),
        up: () => this.up(),
        down: () => this.down(),
        move: (event) => this.mousemove(event),
      },
    });
    this.Graph3D = new Graph3D({
      WIN: this.WIN,
    });
    this.figure = new figure().Cube();
    this.Canvas3D.clear();
    this.render();
    this.dx = 0;
    this.dy = 0;
    this.canRotate = false;
  }

  wheel(event) {
    const delta = event.wheelDelta > 0 ? 1.1 : 0.9;
    this.figure.points.forEach((point) => this.Graph3D.zoom(delta, point));
    this.render();
  }

  down() {
    this.canRotate = true;
  }
  up() {
    this.canRotate = false;
  }

  mousedown(event) {
    if (this.canRotate) {
      this.dx = event.offsetX;
      this.dy = event.offsetY;
    }
  }

  mousemove(event) {
    if (this.canRotate) {
      const gradus = Math.PI / 180 / 4;
      this.figure.points.forEach((point) => {
        this.Graph3D.rotateOy((this.dy - event.offsetY) * gradus, point);
        this.Graph3D.rotateOx((this.dx - event.offsetX) * gradus, point);
      });
      this.dx = event.offsetX;
      this.dy = event.offsetY;
    }
    this.render();
  }

  render() {
    this.Canvas3D.clear();
    //Вершины, плоскости, грани

    //Vertex
    this.figure.points.forEach((point) => {
      let x = this.Graph3D.xs(point);
      let y = this.Graph3D.ys(point);
      this.Canvas3D.printPoint(x, y);
    });

    //Faces
    this.Graph3D.calcDistance(this.figure);
    this.Graph3D.sortByArtistAlgorithm(this.figure);
    this.figure.polygons.forEach((poly) => {
      const points = [];
      for (let i = 0; i < poly.points.length; i++) {
        points.push({
          x: this.Graph3D.ys(this.figure.points[poly.points[i]]),
          y: this.Graph3D.xs(this.figure.points[poly.points[i]]),
        });
      }
      this.Canvas3D.polygon(points, poly.color);
    });

    //Edges
    this.figure.edges.forEach((Edge) => {
      const point1 = this.figure.points[Edge.p1]; //x
      const point2 = this.figure.points[Edge.p2];
      this.Canvas3D.line(
        this.Graph3D.ys(point1),
        this.Graph3D.xs(point1),
        this.Graph3D.ys(point2),
        this.Graph3D.xs(point2),
        "gray"
      );
    });
  }
}
