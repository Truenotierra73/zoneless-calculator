import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';

import { CalculatorButtonComponent } from '@/calculator/components/calculator-button/calculator-button.component';

import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {
  private readonly calculatorService: CalculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  // get resultText() {
  //   return this.calculatorService.resultText;
  // }

  handleClick(key: string) {
    // console.log({ key });
    this.calculatorService.constructNumber(key);
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent({ key }: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      'c': 'C',
      '*': '⨉',
      'x': '⨉',
      '/': '÷',
      Enter: '=',
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
