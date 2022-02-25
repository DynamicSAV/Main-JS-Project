class CalculatorComponent extends Component {
  constructor(options) {
    super(options);
    this.calculator = new Calculator();
    this.polyCalc = new PolynomialCalculator();

    this.realCalculator = new RealCalculator();
    this.complexCalculator = new ComplexCalculator();
    this.vectorCalculator = new VectorCalculator();
    this.matrixCalculator = new MatrixCalculator();
    this.calculator = new Calculator();
    this.vector = new Vector();
    this.matrix = new Matrix();
    this.complex = new Complex();
    this.a = document.getElementById("a");
    this.b = document.getElementById("b");
    this.result = document.getElementById("result");
    this.arrFirsNum = [];
    this.arrSecondNum = [];
  }
  _addEventListeners() {
    const buttons = document.querySelectorAll(".calculatorOperationButton");
    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        this.operation(button.dataset.operand)
      );
    });
    document
      .getElementById("add")
      .addEventListener("click", () => this.add(this.a.value, this.b.value));
    document
      .getElementById("sub")
      .addEventListener("click", () => this.sub(this.a.value, this.b.value));
    document
      .getElementById("mult")
      .addEventListener("click", () => this.mult(this.a.value, this.b.value));
    document
      .getElementById("inv")
      .addEventListener("click", () => this.inv(this.a.value));
    document
      .getElementById("div")
      .addEventListener("click", () => this.div(this.a.value, this.b.value));
    document.getElementById("one").addEventListener("click", () => this.one());
    document
      .getElementById("zero")
      .addEventListener("click", () => this.zero());
    document
      .getElementById("pow")
      .addEventListener("click", () => this.pow(this.a.value, this.b.value));
    document
      .getElementById("prod")
      .addEventListener("click", () => this.prod(this.a.value, this.b.value));
  }

  add(a, b) {
    if (a.includes("[") || b.includes("[")) {
      let matrix1 = this.calculator.toMatrix(a);
      // console.log(matrix1, "матрица 1");
      // console.log(matrix1[0][0], matrix1[1][0]);

      let matrix2 = this.calculator.toMatrix(b);
      let result = this.calculator.add(matrix1, matrix2);
      //console.log(result);
      result = this.calculator.toString(result);
      console.log(result, "result");
      return (this.result.value = result);
      // console.log(matrix2, "матрица 2");
      // console.log(matrix2[0][0], matrix2[1][0]);
      //console.log(matrix2);
      // let result = this.matrixCalculator.add(vector1, vector2);
      // return this.result.value = this.vectorCalculator.toString(result)
    }
    if (a.includes("(") || b.includes("(")) {
      let vector1 = this.calculator.toVector(a);
      let vector2 = this.calculator.toVector(b);
      let result = this.calculator.add(vector1, vector2);
      return (this.result.value = this.vector.toString(result));
    }
    if (a.includes("i") || b.includes("i")) {
      let compl1 = this.calculator.toComplex(a);
      let compl2 = this.calculator.toComplex(b);
      let result = this.calculator.add(compl1, compl2);
      return (this.result.value = this.calculator.toString(
        result.re,
        result.im
      ));
    } else {
      return (this.result.value = this.calculator.add(a, b));
    }
  }

  sub(a, b) {
    if (a.includes("[") || b.includes("[")) {
      let matrix1 = this.matrixCalculator.toMatrix(a);
      let matrix2 = this.matrixCalculator.toMatrix(b);
      let result = this.matrixCalculator.sub(matrix1, matrix2);
      result = this.matrixCalculator.toString(result);
      console.log(result, "result");
      return (this.result.value = result);
    }
    if (a.includes("(") || b.includes("(")) {
      let vector1 = this.vectorCalculator.toVector(a);
      let vector2 = this.vectorCalculator.toVector(b);
      let result = this.vectorCalculator.sub(vector1, vector2);
      return (this.result.value = this.vectorCalculator.toString(result));
    }
    if (a.includes("i") || b.includes("i")) {
      let compl1 = this.complexCalculator.toComplex(a);
      let compl2 = this.complexCalculator.toComplex(b);
      let result = this.complexCalculator.sub(compl1, compl2);
      return (this.result.value = this.complexCalculator.toString(
        result.re,
        result.im
      ));
    }
    return (this.result.value = this.realCalculator.sub(a - 0, b - 0));
  }

  mult(a, b) {
    if (a.includes("[") || b.includes("[")) {
      let matrix1 = this.matrixCalculator.toMatrix(a);
      let matrix2 = this.matrixCalculator.toMatrix(b);
      let result = this.matrixCalculator.mult(matrix1, matrix2);
      result = this.matrixCalculator.toString(result);
      console.log(result, "result");
      return (this.result.value = result);
    }

    if (a.includes("(") || b.includes("(")) {
      let vector1 = this.vectorCalculator.toVector(a);
      let vector2 = this.vectorCalculator.toVector(b);
      let result = this.vectorCalculator.mult(vector1, vector2);
      console.log(result);
      result = this.vectorCalculator.toString(result);
      return (this.result.value = result);
    }
    if (a.includes("i") || b.includes("i")) {
      let compl1 = this.complexCalculator.toComplex(a);
      let compl2 = this.complexCalculator.toComplex(b);
      let result = (this.result.value = this.complexCalculator.mult(
        compl1,
        compl2
      ));
      return (this.result.value = this.complexCalculator.toString(
        result.re,
        result.im
      ));
    }
    return (this.result.value = this.realCalculator.mult(a - 0, b - 0));
  }

  div(a, b) {
    if (a.includes("(") || b.includes("(")) {
      let vector1 = this.vectorCalculator.toVector(a);
      let vector2 = this.vectorCalculator.toVector(b);
      let result = this.vectorCalculator.div(vector1, vector2);
      return (this.result.value = this.vectorCalculator.toString(result));
    }
    if (a.includes("i") || b.includes("i")) {
      let compl1 = this.complexCalculator.toComplex(a);
      let compl2 = this.complexCalculator.toComplex(b);
      let result = this.complexCalculator.div(compl1, compl2);
      return (this.result.value = this.complexCalculator.toString(
        result.re,
        result.im
      ));
    }
    return (this.result.value = this.realCalculator.div(a - 0, b - 0));
  }

  one(a, b) {
    if (a.includes("(") || b.includes("(")) {
      let result = this.vectorCalculator.one();
      return (this.result.value = this.vectorCalculator.toString(result));
    }
    return (this.result.value = this.realCalculator.one(a - 0, b - 0));
  }

  zero(a, b) {
    if (a.includes("(") || b.includes("(")) {
      let result = this.vectorCalculator.zero();
      return (this.result.value = this.vectorCalculator.toString(result));
    }
    return (this.result.value = this.realCalculator.zero(a - 0, b - 0));
  }

  pow(a, n) {
    if (a.includes("(") || n.includes("(")) {
      let vector1 = this.vectorCalculator.toVector(a);
      let result = this.vectorCalculator.pow(vector1, n);
      console.log(result);
      return (this.result.value = this.vectorCalculator.toString(result));
    }
    return (this.result.value = this.realCalculator.pow(a - 0, n - 0));
  }

  prod(a, p) {
    if (a.includes("(") || p.includes("(")) {
      let vector1 = this.vectorCalculator.toVector(a);
      let result = this.vectorCalculator.prod(vector1, p);
      console.log(result);
      return (this.result.value = this.vectorCalculator.toString(result));
    }
    return (this.result.value = this.realCalculator.prod(a, p));
  }

  operation(operand = "add") {
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;
    console.log(this.polyCalc[operand]);
    const c = this.polyCalc[operand](
      this.polyCalc.toPolynomial(a),
      this.polyCalc.toPolynomial(b)
    );
    this.result.value = 100;
  }
}
