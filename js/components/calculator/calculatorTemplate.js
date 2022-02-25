Template.prototype.calculatorTemplate = () => `
<div class = "calculatorBlock">
  <p id = "listName">Калькулятор <i class="fas fa-calculator"></i></p>
  <div class = "display">
    <textarea class = "calculatorInput" placeholder = "First num" id = "a"></textarea>
    <textarea class = "calculatorInput" placeholder = "Second num" id = "b"></textarea>
    <textarea class = "calculatorOutput" placeholder = "Result" id = "result" readonly = "readonly"></textarea>
  </div>
  <div class = "calculatorLine"></div>
  <div class = "calculatorButtons">
    <button id = "add"  class = "calculatorOperationButton" data-operand="add">+</button>
    <button id = "sub"  class = "calculatorOperationButton" data-operand="sub">-</button>
    <button id = "mult" class = "calculatorOperationButton" data-operand="mult">*</button>
    <br>
    <button id = "div"  class = "calculatorOperationButton" data-operand="div">/</button>
    <button id = "inv"  class = "calculatorOperationButton" data-operand="inv">Inv</button>
    <button id = "one"  class = "calculatorOperationButton" data-operand="one">-1-</button>
    <br>
    <button id = "zero"  class = "calculatorOperationButton" data-operand="zero">-0-</button>
    <button id = "pow"  class = "calculatorOperationButton">^</button>
    <button id = "prod"  class = "calculatorOperationButton">prod</button>
  </div>
</div>
`;
