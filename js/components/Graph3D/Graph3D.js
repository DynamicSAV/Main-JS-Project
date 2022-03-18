class Graph3D {
  constructor({ WIN }) {
    this.WIN = WIN;
  }

  xs(point) {
    return (
      (point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z)) /
      (this.WIN.CAMERA.z - point.z)
    );
  }

  ys(point) {
    return (
      (point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z)) /
      (this.WIN.CAMERA.z - point.z)
    );
  }

  sortByArtistAlgorithm(figure) {
    figure.polygons.sort((a, b) => a.distance - b.distance);
  }

  multMatrix(T, m) {
    let matrLength = m.length;
    let matrZoom = [0, 0, 0, 0];
    for (let i = 0; i < matrLength; i++) {
      for (let j = 0; j < matrLength; j++) {
        matrZoom[i] += T[i][j] * m[j];
      }
    }
    return matrZoom;
  }

  zoom(delta, point) {
    const array = this.multMatrix(
      [
        [delta, 0, 0, 0],
        [0, delta, 0, 0],
        [0, 0, delta, 0],
        [0, 0, 0, 1],
      ],
      [point.x, point.y, point.z, 1]
    );
    point.x = array[0];
    point.y = array[1];
    point.z = array[2];
  }

  


  rotateOx(alpha, point) {
    const array = this.multMatrix(
      [
        [1, 0, 0, 0],
        [0, Math.cos(alpha), Math.sin(alpha), 0],
        [0, -Math.sin(alpha), Math.cos(alpha), 0],
        [0, 0, 0, 1],
      ],
      [point.x, point.y, point.z, 1]
    );
    point.x = array[0];
    point.y = array[1];
    point.z = array[2];
  }
  rotateOy(alpha, point) {
    const array = this.multMatrix(
      [
        [Math.cos(alpha), 0, -Math.sin(alpha), 0],
        [0, 1, 0, 0],
        [Math.sin(alpha), 0, Math.cos(alpha), 0],
        [0, 0, 0, 1],
      ],
      [point.x, point.y, point.z, 1]
    );
    point.x = array[0];
    point.y = array[1];
    point.z = array[2];
  }
  rotateOz(alpha, point) {
    const array = this.multMatrix(
      [
        [Math.cos(alpha), Math.sin(alpha), 0, 0],
        [-Math.sin(alpha), Math.cos(alpha), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ],
      [point.x, point.y, point.z, 1]
    );
    point.x = array[0];
    point.y = array[1];
    point.z = array[2];
  }

  calcDistance(figure) {
    figure.polygons.forEach((polygon) => {
      const points = polygon.points;
      let x = 0,
        y = 0,
        z = 0;
      for (let i = 0; i < points.length; i++) {
        x += figure.points[points[i]].x;
        y += figure.points[points[i]].y;
        z += figure.points[points[i]].z;
      }
      x /= points.length;
      y /= points.length;
      z /= points.length;

      polygon.distance = Math.sqrt(
        Math.pow(this.WIN.CAMERA.x - x, 2) +
          Math.pow(this.WIN.CAMERA.y - y, 2) +
          Math.pow(this.WIN.CAMERA.z - z, 2)
      );
    });
  }

}