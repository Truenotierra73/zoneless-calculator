import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '⨉', '÷'];
const specialOperators = ['+/-', '%', '.', '=', 'Backspace', 'C'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  constructNumber(value: string): void {
    // Validar inputs
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid operator', value);
      return;
    }

    // Tecla "Enter"
    if (value === '=') {
      console.log('Calcular resultado');
      this.calculateResult();
      return;
    }

    // Limpiar resultados
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');

      return;
    }

    // Tecla "Retroceso" o "Backspace"
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');

        return;
      }

      this.resultText.update(currentValue => currentValue.slice(0, -1));
    }

    // Aplicar operador
    if (operators.includes(value)) {
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');

      return;
    }

    // Límite de número de caracteres
    if (this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    // Validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');

        return;
      }

      this.resultText.update(currentValue => currentValue + '.');

      return;
    }

    // Manejo del cero inicial
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // Cambiar de signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(currentValue => currentValue.slice(1));
        return;
      }

      this.resultText.update(currentValue => '-' + currentValue);
      return;
    }

    // Números
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update(currentValue => currentValue + value);
      return;
    }
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
      case '⨉':
        result = number1 * number2;
        break;
      case '/':
      case '÷':
        result = number1 / number2;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    // this.lastOperator.set('+');
  }
}
