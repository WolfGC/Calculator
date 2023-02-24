const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, firstNum, secondNum) {
  firstNum = Number(firstNum);
  secondNum = Number(secondNum);
  const operators = {
    '+': add(firstNum, secondNum),
    '-': subtract(firstNum, secondNum),
    '*': multiply(firstNum, secondNum),
    '/': divide(firstNum, secondNum),
  };
  return operators[operator] ?? 'Error';
}

console.log('add', operate('+', 234, 234));
