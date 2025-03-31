let currentInput = '';
let operation = '';
let firstOperand = '';
let secondOperand = '';

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperation(key);
    }
    if (key === 'Enter') {
        calculate();
    }
    if (key === 'Backspace') {
        clearDisplay();
    }
    if (key === 'Escape' || key === 'c') {
        clearSelected();
    }
});

document.getElementById('result').addEventListener('mouseup', function (event) {
    const selectedText = window.getSelection().toString();

    if (selectedText) {
        document.addEventListener("keydown", function (event) {
            const key = event.key;
            if (key >= '0' && key <= '9') {
                const resultField = document.getElementById('result');
                resultField.value = resultField.value.replace(selectedText, key);
            }
        });
    }
});

function appendNumber(number) {
    const resultField = document.getElementById('result');
    const selectedText = window.getSelection().toString();

    if (selectedText) {
        resultField.value = resultField.value.replace(selectedText, number);
    } else {
        currentInput += number;
        resultField.value = currentInput;
    }
}

function setOperation(op) {
    if (firstOperand === '') {
        firstOperand = currentInput;
        operation = op;
        currentInput = '';
        document.getElementById('operation-display').textContent = op;
    } else if (secondOperand === '') {
        secondOperand = currentInput;
        calculate();
        operation = op;
        firstOperand = document.getElementById('result').value;
        currentInput = '';
        document.getElementById('operation-display').textContent = op;
    }
}

function clearDisplay() {
    currentInput = '';
    firstOperand = '';
    secondOperand = '';
    operation = '';
    document.getElementById('result').value = '';
    document.getElementById('operation-display').textContent = '';
}

function clearSelected() {
    const resultField = document.getElementById('result');
    const selectedText = window.getSelection().toString();

    if (selectedText) {
        resultField.value = resultField.value.replace(selectedText, '');
    } else {
        clearDisplay();
    }
}

function calculate() {
    if (firstOperand !== '' && currentInput !== '') {
        secondOperand = currentInput;
        let result = 0;
        firstOperand = parseFloat(firstOperand);
        secondOperand = parseFloat(secondOperand);

        switch (operation) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    alert("Bir sayı sıfıra bölünemez!");
                    clearDisplay();
                    return;
                } else {
                    result = firstOperand / secondOperand;
                }
                break;
            default:
                return;
        }

        document.getElementById('result').value = result;
        currentInput = result.toString();
        firstOperand = '';
        secondOperand = '';
        operation = '';
        document.getElementById('operation-display').textContent = '';
    }
}
