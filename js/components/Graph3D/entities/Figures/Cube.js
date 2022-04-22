figure.prototype.Cube = (
  color = "black",//#ff0000
  animations = []
) => {
  const points = [
    new Point(-5, -5, 5),
    new Point(-5, 5, 5),
    new Point(5, 5, 5),
    new Point(5, -5, 5),
    new Point(-5, -5, -5),
    new Point(-5, 5, -5),
    new Point(5, 5, -5),
    new Point(5, -5, -5),
  ];
  const edges = [
    new Edge(0, 1),
    new Edge(0, 4),
    new Edge(0, 3),
    new Edge(1, 2),
    new Edge(1, 5),
    new Edge(2, 3),
    new Edge(2, 6),
    new Edge(3, 7),
    new Edge(4, 5),
    new Edge(4, 7),
    new Edge(5, 6),
    new Edge(6, 7),
  ];
  const polygons = [
    new Polygon([0, 1, 2, 3], color),
    new Polygon([0, 4, 7, 3], color),
    new Polygon([0, 4, 5, 1], color),
    new Polygon([4, 5, 6, 7], color),
    new Polygon([7, 3, 2, 6], color),
    new Polygon([1, 5, 6, 2], color),
  ];
  return new Subject(points, edges, polygons);
};
