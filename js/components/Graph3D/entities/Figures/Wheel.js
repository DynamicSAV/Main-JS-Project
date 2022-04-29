figure.prototype.Wheel = (R = 10, count = 10) => {
  const points = [];
  let di = (2 * Math.PI) / count;
  for (z = 0; z > -50; z -= 2) {
    for (let i = 0; i < 2 * Math.PI; i += di) {
      points.push(new Point(R * Math.cos(i), R * Math.sin(i), z));
    }
  }
  return new Subject(points);
};
