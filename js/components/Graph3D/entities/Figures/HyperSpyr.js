figure.prototype.HyperSpyr = (a = 10, count = 10) => {
  const points = [];
  let di = (2 * Math.PI) / count;

  for (let i = 0; i < 2 * Math.PI; i += di) {
    points.push(
      new Point(
        2 * a * Math.cos(i) + a * Math.cos(2 * i),
        2 * a * Math.sin(i) - a * Math.sin(2 * i),
        0
      )
    );
  }

  return new Subject(points);
};
