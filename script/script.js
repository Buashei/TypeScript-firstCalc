var keys = document.querySelector('.calculator__keys');
var display = document.querySelector('.calculator__display');
var operatorKeys = document.querySelectorAll('[data-type="operator"]');
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
            clearLocalState(state);
            clearOperationKeyState(operatorKeys);
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
        clearOperationKeyState(operatorKeys);
        key.dataset.state = 'selected';
        state.firstNumber = displayValue;
        state.operator = key.className;
    }
    if (type === 'equal') {
        var firstNumber = state.firstNumber, secondNumber = state.secondNumber, operator = state.operator;
        secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber).toString();
        if (!firstNumber || !operator || !secondNumber) {
            display.textContent = displayValue;
        }
        clearOperationKeyState(operatorKeys);
        clearLocalState(state);
    }
    state.previousKeyType = type;
});
var clearOperationKeyState = function (operatorKeys) {
    operatorKeys.forEach(function (operatorKey) {
        if (operatorKey instanceof HTMLElement) {
            operatorKey.dataset.state = '';
        }
    });
};
var clearLocalState = function (state) {
    for (var key in state) {
        delete state[key];
    }
};
var calculate = function (firstNumberInString, operator, secondNumberInString) {
    var firstNumber = +firstNumberInString;
    var secondNumber = +secondNumberInString;
    if (operator === 'plus')
        return firstNumber + secondNumber;
    if (operator === 'minus')
        return firstNumber - secondNumber;
    if (operator === 'times')
        return firstNumber * secondNumber;
    if (operator === 'divide')
        return firstNumber / secondNumber;
};
