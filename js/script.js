var keys = document.querySelector('.calculator__keys');
var display = document.querySelector('.calculator__display');
var state = {
    previousKeyType: "",
    firstNumber: "",
    secondNumber: "",
    operator: ""
};
keys.addEventListener('click', function (event) {
    var key = event.target;
    var keyValue = key.textContent;
    var displayValue = display.textContent;
    var type = key.dataset.type;
    if (!key.closest('button'))
        return;
    if (type === 'number') {
        if (key.className === "clear") {
            clearLocalState();
            clearOperationKeyState();
            display.textContent = "0";
            return;
        }
        if (displayValue === '0' || state.previousKeyType === 'operator' || state.previousKeyType === 'equal') {
            display.textContent = keyValue;
        }
        else {
            display.textContent = displayValue + keyValue;
        }
        state.previousKeyType = type;
    }
    if (type === 'operator') {
        clearOperationKeyState();
        key.dataset.state = 'selected';
        state.firstNumber = displayValue;
        state.operator = key.className;
    }
    if (type === 'equal') {
        var firstNumber = state.firstNumber, secondNumber = state.secondNumber, operator = state.operator;
        secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber);
        if (!firstNumber || !operator || !secondNumber) {
            display.textContent = displayValue;
        }
        clearOperationKeyState();
        clearLocalState();
    }
    state.previousKeyType = type;
});
var clearOperationKeyState = function () {
    var operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach(function (operatorKey) {
        if (operatorKey instanceof HTMLElement) {
            operatorKey.dataset.stat = '';
        }
    });
};
var clearLocalState = function () {
    for (var key in state) {
        delete state[key];
    }
};
function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    if (operator === 'plus')
        return firstNumber + secondNumber;
    if (operator === 'minus')
        return firstNumber - secondNumber;
    if (operator === 'times')
        return firstNumber * secondNumber;
    if (operator === 'divide')
        return firstNumber / secondNumber;
}
