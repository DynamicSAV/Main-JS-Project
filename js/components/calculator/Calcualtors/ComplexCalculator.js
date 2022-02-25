class ComplexCalculator extends RealCalculator {
  add(a, b) {
    //Сложение
    return new Complex(a.re + b.re, a.im + b.im);
  }

  sub(a, b) {
    //вычитание
    return new Complex(a.re - b.re, a.im - b.im);
  }

  mult(a, b) {
    //Умножение
    return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
  }

  div(a, b) {
    //Деление комплексных чисел
    return new Complex(inv(a, b), mult(a, b));
  }

  inv(a, b) {
    //Деление 1 на комплексное число
    g = Math.pow(a.re, 2) + Math.pow(a.im, 2);
    return new Complex();
  }

  prod(a, p) {
    //Произведение скаляра на комплексное число
    return new Complex(p * a.re, p * a.im);
  }

  zero(a) {
    //Комплексный ноль
    return new Complex((a.re = 0), (a.im = 0));
  }

  one(a) {
    //Комплексная единица
    return new Complex(super.one());
  }

  pow(a, n) {
    let c = this.one();
    for (let i = 0; i < n; i++) {
      c = this.mult(a, c);
    }
    return c;
  }
}
