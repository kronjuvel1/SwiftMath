const numberButtons = document.querySelectorAll(".button.number");
const operatorButtons = document.querySelectorAll(".button.getOperators");
const decimalPointButton = document.querySelector("#addDecimalPoint");
const resultButton = document.querySelector("#resultBtn");
const clearButton = document.querySelector("#clearBtn");
const backspaceButton = document.querySelector("#backspaceBtn");
const changeSignButton = document.querySelector("#changeSignBtn");
const displayElement = document.querySelector("#display");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let isError = false;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
    if (num2 !== 0) {
        return num1 / num2;
    } else {
        isError = true;
        clearCalculator();
        updateDisplay();
        return "Error: Cannot divide by 0";
    }
};

const operate = (num1, num2, operator) => {
    const parsedNumber1 = parseFloat(num1);
    const parsedNumber2 = parseFloat(num2);

    switch (operator) {
        case "+":
            return add(parsedNumber1, parsedNumber2);
        case "-":
            return subtract(parsedNumber1, parsedNumber2);
        case "x":
            return multiply(parsedNumber1, parsedNumber2);
        case "÷":
            return divide(parsedNumber1, parsedNumber2);
        default:
            return num2 !== "" ? parsedNumber2 : parsedNumber1;
    }
};

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
        if (isError) {
            clearCalculator();
            isError = false;
        }
        if (currentOperator) {
            secondNumber += key;
        } else {
            firstNumber += key;
        }
        updateDisplay();
    }

    if (["+", "-", "*", "/"].includes(key)) {
        if (firstNumber !== "" && secondNumber !== "" && currentOperator !== "") {
            const result = operate(firstNumber, secondNumber, currentOperator);
            displayElement.textContent = result;
            firstNumber = result.toString();
            secondNumber = "";
        }
        currentOperator = key;
        updateDisplay();
    }

    if (key === "Enter") {
        if (currentOperator && secondNumber !== "") {
            const result = operate(firstNumber, secondNumber, currentOperator);
            displayElement.textContent = result;
            firstNumber = result.toString();
            secondNumber = "";
            currentOperator = "";
        }
    }

    if (key === "Backspace") {
        if (currentOperator) {
            secondNumber = secondNumber.slice(0, -1);
        } else {
            firstNumber = firstNumber.slice(0, -1);
        }
        updateDisplay();
    }

    if (key === "Escape") {
        clearCalculator();
        updateDisplay();
    }
});

numberButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const clickedNumber = button.textContent.trim();
        if (isError) {
            clearCalculator();
            isError = false;
        }
        if (currentOperator) {
            secondNumber += clickedNumber;
        } else {
            firstNumber += clickedNumber;
        }
        updateDisplay();
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", function () {
        if (firstNumber !== "" && secondNumber !== "" && currentOperator !== "") {
            const result = operate(firstNumber, secondNumber, currentOperator);
            displayElement.textContent = result;
            firstNumber = result.toString();
            secondNumber = "";
            currentOperator = button.dataset.operator;
        } else if (firstNumber !== "" && !currentOperator) {
            currentOperator = button.dataset.operator;
        }
        updateDisplay();
    });
});

decimalPointButton.addEventListener("click", function () {
    if (currentOperator) {
        if (!secondNumber.includes(".")) {
            secondNumber += ".";
        }
    } else {
        if (!firstNumber.includes(".")) {
            firstNumber += ".";
        }
    }
    updateDisplay();
});

resultButton.addEventListener("click", function () {
    if (currentOperator && secondNumber !== "") {
        const result = operate(firstNumber, secondNumber, currentOperator);
        displayElement.textContent = result;
        firstNumber = result.toString();
        secondNumber = "";
        currentOperator = "";
    }
});

clearButton.addEventListener("click", function () {
    clearCalculator();
    updateDisplay();
});

backspaceButton.addEventListener("click", function () {
    if (currentOperator) {
        secondNumber = secondNumber.slice(0, -1);
    } else {
        firstNumber = firstNumber.slice(0, -1);
    }
    updateDisplay();
});

changeSignButton.addEventListener("click", function () {
    if (currentOperator) {
        secondNumber = (parseFloat(secondNumber) * -1).toString();
    } else {
        firstNumber = (parseFloat(firstNumber) * -1).toString();
    }
    updateDisplay();
});

function clearCalculator() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    isError = false;
}

function updateDisplay() {
    const displayText = `${firstNumber} ${currentOperator} ${secondNumber}`;
    displayElement.textContent = displayText;

    if (displayText.length > 10) {
        displayElement.style.fontSize = "1.5rem";
    } else {
        displayElement.style.fontSize = "xx-large";
    }
}