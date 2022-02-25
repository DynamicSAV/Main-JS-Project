figure.prototype.Cube = () => {
  const points = [
    new Point(-5, -5, 0),
    new Point(5, -5, 0),
    new Point(5, 5, 0),
    new Point(-5, 5, 0),
    new Point(-5, -5, -10),
    new Point(5, -5, -10),
    new Point(5, 5, -10),
    new Point(-5, 5, -10),
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
  return new Subject(points, edges);
};
