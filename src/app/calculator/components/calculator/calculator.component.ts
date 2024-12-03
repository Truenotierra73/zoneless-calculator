import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';

import { CalculatorButtonComponent } from '@/calculator/components/calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
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
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    console.log({ key });
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent({ key }: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
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
