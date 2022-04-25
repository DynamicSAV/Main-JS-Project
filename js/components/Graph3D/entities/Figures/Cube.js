figure.prototype.Cube = (color) => {
  const points = [
      new Point(5, 5, 5), new Point(5, -5, 5),
      new Point(-5, 5, 5), new Point(5, 5, -5),
      new Point(-5, 5, -5), new Point(-5, -5, 5),
      new Point(-5, -5, -5), new Point(5, -5, -5)
  ];
  const edges = [
      //-----------------------------//
      new Edge(4, 2), new Edge(5, 2),
      new Edge(6, 5), new Edge(6, 4),
      //-----------------------------//
      new Edge(7, 3), new Edge(0, 1),
      new Edge(7, 1), new Edge(0, 3),
      //-----------------------------//
      new Edge(0, 2), new Edge(5, 1), 
      new Edge(4, 3), new Edge(7, 6),
  ];
  const polygons = [
      new Polygon([0, 2, 5, 1], color), new Polygon([0, 2, 4, 3], color),
      new Polygon([0, 1, 7, 3], color), new Polygon([2, 5, 6, 4], color),
      new Polygon([1, 5, 6, 7], color), new Polygon([4, 3, 7, 6], color)
      ]
  return new Subject (points, edges, polygons); 
}