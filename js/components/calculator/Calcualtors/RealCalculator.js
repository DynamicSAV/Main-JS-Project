class RealCalculator {
  add(a, b) {
    return a + b;
  }
  sub(a, b) {
    return a - b;
  }
  mult(a, b) {
    return a * b;
  }
  div(a, b) {
    return a / b;
  }
  prod(a, p) {
    return a * p;
  }
  pow(a, n) {
    return Math.pow(a, n);
  }
  one(a, b) {
    return 1;
  }
  zero(a, b) {
    return 0;
  }
  get(a) {
    //Возвращает соотв. калькулятор по типу эл. а
    return a instanceof Matrix
      ? new MatrixCalculator()
      : a instanceof Vector
      ? new VectorCalculator()
      : a instanceof Complex
      ? new ComplexCalculator()
      : new RealCalculator();
  }
  type(calc, elem, method) {
    if (elem instanceof Matrix) {
      return calc[method](elem.values.length, elem.values[0][0]);
    } else if (elem instanceof Vector) {
      return calc[method](elem.values.length, elem.values[0]);
    } else return calc[method]();
  }
}
