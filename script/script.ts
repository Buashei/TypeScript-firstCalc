const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const operatorKeys = document.querySelectorAll('[data-type="operator"]');

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
            clearLocalState(state);
            clearOperationKeyState(operatorKeys);
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
    clearOperationKeyState(operatorKeys)
    key.dataset.state = 'selected';
    state.firstNumber = displayValue;
    state.operator = key.className;
}

    if(type === 'equal') {
        let { firstNumber, secondNumber, operator } = state;
        secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber).toString();
        if(!firstNumber || !operator || !secondNumber){ display.textContent = displayValue; }
        clearOperationKeyState(operatorKeys)
        clearLocalState(state);
    }
    state.previousKeyType = type;

})

const clearOperationKeyState = (operatorKeys): void => {
    operatorKeys.forEach(operatorKey => {
        if(operatorKey instanceof HTMLElement){
            operatorKey.dataset.state = '' 
        } 
    });
}

const clearLocalState = (state: Object): void => {
    for (var key in state) {
          delete state[key];
    }
}

const calculate = (firstNumberInString: string, operator: string, secondNumberInString: string): number => {
    const firstNumber: number = +firstNumberInString
    const secondNumber: number = +secondNumberInString
    if (operator === 'plus') return firstNumber + secondNumber;
    if (operator === 'minus') return firstNumber - secondNumber;
    if (operator === 'times') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber; 
}