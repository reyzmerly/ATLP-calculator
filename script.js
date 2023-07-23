let displayValue = '0';
let number1 = null;
let number2 = null;
let operator1 = null;
let operator2 = null;
let display = document.getElementById('display-text');

clearDisplay();

window.addEventListener('keydown', function(e){
    const pressedKey = document.querySelector(`button[data-key='${e.key}']`);
    pressedKey.click();
});

let numberInputs = Array.from(document.getElementsByClassName('number'));
for (let i = 0; i < numberInputs.length; i++) {
    numberInputs[i].addEventListener('click', function() {
        displayNumbers(numberInputs[i].value);
        updateDisplay();
    });
};

let operatorKeys = Array.from(document.getElementsByClassName('operation'));
for (let i = 0; i < operatorKeys.length; i++) {
    operatorKeys[i].addEventListener('click', function () {  
        if (operator1 != null && operator2 == null) {
            operator2 = operatorKeys[i].value;
            number2 = displayValue;
            result = operate(operator1, Number(number1), Number(number2));
            displayValue = round(result, 12).toString();
            updateDisplay();
            number1 = displayValue;
            result = null;
        } else if (operator1 != null && operator2 != null) {
            number2 = displayValue;
            result = operate(operator2, Number(number1), Number(number2));
            operator2 = operatorKeys[i].value;
            displayValue = round(result, 12).toString();
            updateDisplay();
            number1 = displayValue;
            result = null;
        } else {
            operator1 = operatorKeys[i].value;
            number1 = displayValue;

            if (operator1 == 'sqrt' || operator1 == '%') {
                result = operate(operator1, Number(number1));
                displayValue = round(result, 12).toString();
                updateDisplay();
                number1 = displayValue;
                operator1 = null;
                result = null;
            }
        }
    });
};

let plusMinus = document.getElementById('plus-minus');
plusMinus.addEventListener('click', function() {
    if (displayValue.includes('-')) {
        displayValue = displayValue.substring(1);
        updateDisplay();
    } else {
        displayValue = `-${displayValue}`;
        updateDisplay();
    }
});

let equalsKey = document.getElementById('equals');
equalsKey.addEventListener('click', function() {
    if (displayValue == 0 && operator1 == '/') {
        alert('Cannot divide by 0!');
        clearAll();
        return;
    } else if (number1 == null) {
        displayValue = displayValue;
    } else if (number2 != null) {
        number2 = displayValue;
        result = operate(operator2, Number(number1), Number(number2));
        displayValue = round(result, 12).toString();
        updateDisplay();
        number1 = displayValue;
        number2 = null;
        operator1 = null;
        operator2 = null;
        result = null;
    } else {
        number2 = displayValue;
        result = operate(operator1, Number(number1), Number(number2));
        displayValue = round(result, 12).toString();
        updateDisplay();
        number1 = displayValue;
        number2 = null;
        operator1 = null;
        operator2 = null;
        result = null;
    }
});

let clearKey = document.getElementById('clear');
clearKey.addEventListener('click', clearAll);

function clearAll() {
    displayValue = '0';
    number1 = null;
    number2 = null;
    operator1 = null;
    operator2 = null;
    result = null;
    updateDisplay();
}

function displayNumbers(number) {
    if (number1 === null) {
        if (displayValue === '0' || displayValue === 0 || displayValue === '') {
            displayValue = number;
        } else if (displayValue === number1) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    } else {
        if (displayValue === number1) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
}

function updateDisplay() {
    display.textContent = displayValue;
    if (displayValue.length > 13) {
        display.innerText = displayValue.substring(0, 13);
    }
}

function clearDisplay() {
    display.textContent = '';
}

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            result = addNumbers(firstNumber, secondNumber);
            break;
        case '-':
            result = subtractNumbers(firstNumber, secondNumber);
            break;
        case '*':
            result = multiplyNumbers(firstNumber, secondNumber);
            break;
        case '/':
            result = divideNumbers(firstNumber, secondNumber);
            break;
        case 'sqrt':
            result = squareRoot(firstNumber);
            break;
        case '%':
            result = percent(firstNumber);
            break;
    }
    return result;
}

function addNumbers(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtractNumbers(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiplyNumbers(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divideNumbers(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function squareRoot(number) {
    return Math.sqrt(number);
}

function percent(number) {
    return number / 100;
}

function round(value, decimals) {
    var tenToN = 10 ** decimals;
   return (Math.round(value * tenToN)) / tenToN;
  }