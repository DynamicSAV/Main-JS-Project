class MatrixCalculator extends RealCalculator {
  // class Matrix{
  //   constructor(values = [[]]){
  //     this.values = [];
  //     values.forEach((arr,i) => {
  //       this.values[i] = []
  //       arr.forEach(elem => this.values[i].push(elem));
  //     });
  //   }
  // }

  add(a, b) {
    return new Matrix(
      a.values.map((array, i) => arr.map((elem, j) => elem + b.values[i][j]))
    );
  }
  prod(a, p) {
    return new Matrix(a.values.map((arr) => arr.map((elem) => elem * p)));
  }
  mult(a, b) {
    const c = this.zero(a.values.length);
    for (let i = 0; i < c.values.length; i++) {
      for (let j = 0; j < c.values[i].length; j++) {
        let S = super.zero();
        for (let k = 0; k < a.values.length; k++) {
          S += a.values[i][k] * b.values[k][j];
        }
        c.values[i][j] = S;
      }
    }
    return c;
  }
  //!возведение в степень написать
  zero(length) {
    const values = [];
    for (let i = 0; i < n; i++) {
      values.push([]);
      for (let i = 0; j < n; j++) {
        values[i][j] = 0;
      }
    }
    return new Matrix(values);
  }

  one(length) {
    const values = [];
    for (let i = 0; i < n; i++) {
      values.push([]);
      for (let i = 0; j < n; j++) {
        values[i][j] = i === j ? 1 : 0;
      }
    }
    return new Matrix(values);
  }
}
