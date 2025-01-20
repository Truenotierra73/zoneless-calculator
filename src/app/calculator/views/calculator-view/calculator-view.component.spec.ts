import { ComponentFixture, TestBed } from '@angular/core/testing';

import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let component: CalculatorViewComponent;
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create CalculatorViewComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "calculator" component', () => {
    const calculatorEl: HTMLElement | null = compiled.querySelector('calculator');
    expect(calculatorEl).not.toBeNull();
  });

  it('should contain "div" element and basic css classes', () => {
    const divEl: HTMLElement | null = compiled.querySelector('div');

    expect(divEl).not.toBeNull();

    const mustHaveClasses: string[] = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
    const divClasses: string[] = divEl!.classList.value.split(' ');

    mustHaveClasses.forEach(classname => {
      expect(divClasses).toContain(classname);
    });
  });
});
