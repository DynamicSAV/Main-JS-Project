figure.prototype.Cube = () => {
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
    new Polygon([0, 1, 2, 3], 'red' ),
    new Polygon([0, 4, 7, 3], 'red' ),
    new Polygon([0 ,4, 5, 1], 'red' ),
    new Polygon([4, 5, 6, 7], 'red' ),
    new Polygon([7, 3, 2, 6], 'red' ),
    new Polygon([1, 5, 6, 2], 'red' ),
  ];
  return new Subject(points, edges, polygons);
};
