const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector(".equals-btn");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const prevOperandHTML = document.querySelector(".calc-prevValues");
const currOperandHTML = document.querySelector(".calc-currValues");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

class Calculator {
  constructor(prevOperandHTML, currOperandHTML) {
    this.prevOperandHTML = prevOperandHTML;
    this.currOperandHTML = currOperandHTML;
    this.clear();
  }

  clear() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = null;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNum(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }

  setOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(current)) return;

    const operations = {
      "+": add(prev, current),
      "-": subtract(prev, current),
      "*": multiply(prev, current),
      "/": divide(prev, current),
    };
    computation = operations[this.operation] ?? "Error";

    this.currOperand = this.roundResult(computation);
    this.operation = null;
    this.prevOperand = "";
  }

  updateDisplay() {
    this.currOperandHTML.textContent = this.currOperand;
    if (this.operation != null) {
      this.prevOperandHTML.textContent = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevOperandHTML.textContent = ``;
    }
  }
}

const calculator = new Calculator(prevOperandHTML, currOperandHTML);

window.addEventListener("keydown", handleKeyboardInput);

equalsBtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

numberButtons.forEach((numberBtn) =>
  numberBtn.addEventListener("click", () => {
    calculator.appendNum(numberBtn.textContent);
    calculator.updateDisplay();
  })
);

operationButtons.forEach((operationBtn) =>
  operationBtn.addEventListener("click", () => {
    calculator.setOperation(operationBtn.textContent);
    calculator.updateDisplay();
  })
);

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) calculator.appendNum(e.key);
  if (e.key === "=" || e.key === "Enter") calculator.compute();
  if (e.key === "Backspace") calculator.delete();
  if (e.key === "Escape") calculator.clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    calculator.setOperation(convertOperator(e.key));
  calculator.updateDisplay();
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "/";
  if (keyboardOperator === "*") return "*";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}
