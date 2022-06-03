figure.prototype.HyperbolicCylinder = (a = 0.5, b = 1, c = 3, count = 10, color) => {
  const points = [];
  const edges = [];
  const polygons = [];
  const twoPi = 2 * Math.PI;
  const dt = Math.PI / count;
  const df = twoPi / count;
  const deltaC = c / count;

  let t = -Math.PI;
  while (t <= Math.PI) {
    let f = 0;
    while (f < Math.PI) {
      points.push(new Point(a * Math.cosh(t), b * Math.sinh(t), c * f));
      f += dt;
    }
    t += dt;
  }
  t = -Math.PI;
  while (t <= Math.PI) {
    let f = 0;
    while (f < Math.PI) {
      points.push(new Point(-a * Math.cosh(t), b * Math.sinh(t), c * f));
      f += dt;
    }
    t += dt;
  }

  for (let i = 0; i < points.length / 2; i++) {
    if ((i + 1) % count !== 0) {
      edges.push(new Edge(i, i + 1));
    }
    if (points[i + count] && i + count < points.length / 2) {
      edges.push(new Edge(i, i + count));
    }
  }
  for (let i = points.length / 2; i < points.length; i++) {
    if ((i + 1) % count !== 0) {
      edges.push(new Edge(i, i + 1));
    }
    if (points[i + count] && i + count < points.length) {
      edges.push(new Edge(i, i + count));
    }
  }

  //polygons
  for (let i = 0; i < points.length / 2 - count * 2; i++) {
    if (points[i + count * 2 + 1]) {
      if ((i + 1) % count === 0) {
        null;
      } else polygons.push(new Polygon([i, i + 1, i + count * 2 + 1, i + count * 2], color));
    }
  }
  for (let i = points.length / 2; i < points.length; i++) {
    if (points[i + count * 2 + 1]) {
      if ((i + 1) % count === 0) {
        null;
      } else polygons.push(new Polygon([i, i + 1, i + count * 2 + 1, i + count * 2], color));
    }
  }

  return new Subject(points, edges, polygons);
};
