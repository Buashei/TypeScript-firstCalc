const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

let state = {
    previousKeyType: "",
    firstNumber: "",
    secondNumber: "",
    operator: ""
}

keys.addEventListener('click', event => {
    
    const key = event.target as HTMLElement;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const { type } = key.dataset;
    
    if(!key.closest('button')) return
    
    if(type === 'number'){
        if(key.className === "clear") {
            clearLocalState();
            clearOperationKeyState();
            display.textContent = "0";
            return;
        }
        if(displayValue === '0' || state.previousKeyType === 'operator' || state.previousKeyType === 'equal') {
            display.textContent = keyValue;
        } else {
            display.textContent = displayValue + keyValue;
        }
        state.previousKeyType = type;
    }

    if(type === 'operator') {
    clearOperationKeyState()
    key.dataset.state = 'selected';
    state.firstNumber = displayValue;
    state.operator = key.className;
}

    if(type === 'equal') {
        let { firstNumber, secondNumber, operator } = state;
        secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber);
        if(!firstNumber || !operator || !secondNumber){ display.textContent = displayValue; }
        clearOperationKeyState()
        clearLocalState()
    }
    state.previousKeyType = type;

})

const clearOperationKeyState = () => {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach(operatorKey => {
        if(operatorKey instanceof HTMLElement){
            operatorKey.dataset.stat = '' 
        } 
    });
}

const clearLocalState = () => {
    for (var key in state) {
          delete state[key];
    }
}

function calculate (firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(secondNumber)
    if (operator === 'plus') return firstNumber + secondNumber;
    if (operator === 'minus') return firstNumber - secondNumber;
    if (operator === 'times') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber; 
}