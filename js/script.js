const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

let state = {
    previousKeyType: "",
    firstNumber: "",
    secondNumber: "",
    operator: ""
}

keys.addEventListener('click', event => {
    if(!event.target.closest('button')) return
    
    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const { type } = key.dataset;
    
    if(type === 'number'){
        if(displayValue === '0' || state.previousKeyType === 'operator' || state.previousKeyType === 'equal') {
            display.textContent = keyValue;
        } else {
            display.textContent = displayValue + keyValue;
        }
        state.previousKeyType = type;
    }

    if(type === 'operator') {
    cleanOperationKeyState()
    key.dataset.state = 'selected';
    state.firstNumber = displayValue;
    state.operator = key.className;
}

    if(type === 'equal') {
        let { firstNumber, secondNumber, operator } = state;
        secondNumber = displayValue;
        console.log(firstNumber, operator, secondNumber)
        display.textContent = calculate(firstNumber, operator, secondNumber);
        cleanOperationKeyState()
        cleanLocalState()
    }
    state.previousKeyType = type;
})

const cleanOperationKeyState = () => {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach(operatorKey => { operatorKey.dataset.state = '' });
}

const cleanLocalState = () => {
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