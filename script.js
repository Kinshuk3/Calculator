class Calculator {
    constructor(prevOperTxtElement, currOperTxtElement) {
        this.prevOperTxtElement = prevOperTxtElement;
        this.currOperTxtElement = currOperTxtElement;
        this.readyToReset = false;
        this.clear();
    }


    clear() {
        this.currOper = '';
        this.prvOper = '';
        this.opertion = undefined;
    }

    delete() {
        this.currOper = this.currOper.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currOper.includes('.')) return
        this.currOper = this.currOper.toString() + number.toString();
    }

    chooseOperation(opertion) {
        if (this.currOper === '') return
        if (this.prvOper !== '') {
            this.compute();
        }
        this.opertion = opertion;
        this.prvOper = this.currOper;
        this.currOper = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prvOper);
        const curr = parseFloat(this.currOper);
        if (isNaN(prev) || isNaN(curr)) return

        switch (this.opertion) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return
        }
        this.readyToReset = true;
        this.currOper = computation;
        this.opertion = undefined;
        this.prvOper = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits} `;
        } else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.currOperTxtElement.innerText = this.getDisplayNumber(this.currOper);
        if (this.opertion != null) {
            this.prevOperTxtElement.innerText = `${this.getDisplayNumber(this.prvOper)} ${this.opertion}`;
        } else {
            this.prevOperTxtElement.innerText = '';
        }

    }
}

const allNumBtn = document.querySelectorAll('[data-number]');
const allOperBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const prevOperTxtElement = document.querySelector('[data-previous-operand]');
const currOperTxtElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperTxtElement, currOperTxtElement);

allNumBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.prvOper === "" &&
            calculator.currOper !== "" &&
            calculator.readyToReset) {
            calculator.currOper = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

allOperBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})