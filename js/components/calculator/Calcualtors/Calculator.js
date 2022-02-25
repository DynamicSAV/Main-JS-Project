class Calculator extends RealCalculator {
  toValue(str) {
    return (
      this.toMatrix(str) || this.toVector(str) || this.toComplex(str) || str - 0
    );
  }

  toComplex(str) {
    if (typeof str == "number") {
      return new Complex(str);
    }
    if (typeof str == "string" && str) {
      const arr = str.split("i*");
      if (arr.length == 2) {
        const operand = arr[0].substr(arr[0].length - 1);
        return new Complex(
          arr[0].slice(0, -1) - 0,
          operand == "-" ? operand + arr[1] - 0 : arr[1] - 0
        );
      }
      if (arr.length == 1) {
        return new Complex(arr[0] - 0);
      }
    }
    return null;
  }

  toVector(str) {
    if (str instanceof Array) {
      return new Vector(str);
    }
    if (typeof str == "string" && str) {
      const arr = str.replace("(", "").replace(")", "").split(" ");
      if (arr.length >= 2) {
        return new Vector(arr.map((el) => this.toValue(el)));
      }
    }
    return null;
  }

  toMatrix(str) {
    if (str instanceof Array && str[0] instanceof Array) {
      return new Matrix(str);
    }
    if (typeof str == "string" && str) {
      const arr = str.split("\n");
      if (arr.length >= 2) {
        return new Matrix(
          arr.map((row) => row.split(", ").map((el) => this.toValue(el)))
        );
      }
    }
    return null;
  }

  complex(re, im) {
    return new Complex(re, im);
  }
  vector(values) {
    return new this.Vector(values);
  }
  matrix(values) {
    return new Matrix(values);
  }
  //
  add(a, b) {
    return this.get(a).add(a, b);
  }
  sub(a, b) {
    return this.get(a).sub(a, b);
  }
  mult(a, b) {
    return this.get(a).mult(a, b);
  }
  prod(a, p) {
    if (typeof p === "number") {
      return this.get(a).prod(a, p);
    }
    return null;
  }
  pow(a, n) {
    if (typeof p === "number") {
      return this.get(a).pow(a, n);
    }
    return null;
  }
  one(type, elem) {
    type = type ? type : elem ? elem.constructor.name : null;
    switch (type) {
      case "Complex":
        return new ComplexCalculator().one();
      case "Vector":
        return new VectorCalculator().one(elem.values.length, elem.values[0]);
      case "Matrix":
        return new MatrixCalculator().one(
          elem.values.length,
          elem.values[0][0]
        );
    }
    return super.one();
  }
  zero(type, elem) {
    type = type ? type : elem ? elem.constructor.name : null;
    switch (type) {
      case "Complex":
        return new ComplexCalculator().zero();
      case "Vector":
        return new VectorCalculator().zero(elem.values.length, elem.values[0]);
      case "Matrix":
        return new MatrixCalculator().zero(
          elem.values.length,
          elem.values[0][0]
        );
    }
    return super.zero();
  }
}
