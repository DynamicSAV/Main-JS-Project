class PolynomialCalculator {
  polynomial(members = []) {
    return new Polynomial(members);
  }

  toMember(str) {
    const arrStr = str.split("*x^");
    return new Member(arrStr[0] - 0, arrStr[1] - 0);
  }

  toPolynomial(str) {
    const arrStr = str.replace("-", " -").replace("+", " ").split(" ");
    return new Polynomial(arrStr.map((str) => this.toMember(str)));
  }

  add(a, b) {
    const calc = new Calculator();
    const members = [];
    a.poly.forEach((elemA) => {
      const member = b.poly.find((elemB) => elemB.power == elemA.power);
      if (member) {
        members.push(
          new Member(calc.add(elemA.value, member.value), elemA.power)
        );
      } else {
        members.push(new Member(elemA.value, elemA.power));
      }
    });
    b.poly.forEach((elemB) => {
      if (!members.find((el) => el.power == elemB.power)) {
        members.push(new Member(elemB.value, elemB.power));
      }
    });
    for (let i = members.length - 1; i >= 0; i--) {
      if (members[i].value == 0) {
        members.splice(i, 1);
      }
    }

    return new Polynomial(members);
  }

  sub(a, b) {
    const calc = new Calculator();
    const members = [];
    a.poly.forEach((elemA) => {
      const member = b.poly.find((elemB) => elemB.power == elemA.power);
      if (member) {
        members.push(
          new Member(calc.sub(elemA.value, member.value), elemA.power)
        );
      } else {
        members.push(new Member(elemA.value, elemA.power));
      }
    });
    b.poly.forEach((elemB) => {
      if (!members.find((el) => el.power == elemB.power)) {
        members.push(new Member(calc.prod(elemB.value, -1), elemB.power));
      }
    });
    return new Polynomial(members);
  }

  mult(a, b) {
    const calc = new Calculator();
    let polynomial = new Polynomial();
    a.poly.forEach((elemA) => {
      const members = [];
      b.poly.forEach((elemB) => {
        members.push(
          new Member(
            calc.mult(elemA.value, elemB.value),
            calc.add(elemA.power, elemB.power)
          )
        );
      });
      polynomial = this.add(polynomial, new Polynomial(members));
    });
    return polynomial;
  }

  //всратый
  prod(a, p) {
    const calc = new Calculator();
    const members = [];
    a.poly.forEach((el) => {
      members.push(new Member(calc.prod(el.value, p), el.power));
    });
    return new Polynomial(members);
  }
}
