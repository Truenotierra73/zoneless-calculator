import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test content</span>
    </calculator-button>
  `
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create CalculatorButtonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "w-1/4" if doubleSize() is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(component.isDoubleSize()).toBeFalse();
    expect(hostCssClasses).toContain('w-1/4');
  });

  it('should apply "w-2/4" if doubleSize() is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(component.isDoubleSize()).toBeTrue();
    expect(hostCssClasses).toContain('w-2/4');
  });

  it('should emit onClick when handleClick() is called', () => {
    // Espías
    spyOn(component.onClick, 'emit');

    component.hanldeClick();
    expect(component.onClick.emit).toHaveBeenCalled();
    // expect(component.onClick.emit).toHaveBeenCalledWith('');
  });

  it('should set isPressed to true and then false when keyboardPressedStyle() is called with a matching key', (done: DoneFn) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBe(true);

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });

  it('should not set isPressed to true if key is not matching', () => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalse();
  });

  it('should display projected content', () => {
    const testHostComponentFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostComponentFixture.nativeElement as HTMLDivElement;
    const projectContent = compiled.querySelector('.projected-content');

    expect(projectContent).not.toBeNull();
    expect(projectContent!.classList.contains('underline')).toBeTrue();
  });
});
