import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divEl: HTMLDivElement | null = compiled.querySelector('div');
    const mustHaveClasses: string[] = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    const divClasses: string[] | undefined = divEl?.classList.value.split(' ');

    expect(divEl).not.toBeNull();

    // divEl?.classList.forEach(className => {
    //   expect(mustHaveClasses).toContain(className);
    // });

    mustHaveClasses.forEach((className: string) => {
      expect(divClasses).toContain(className);
    })
  });

  it('should contain the "buy me a beer" link', () => {
    const anchorElement: HTMLAnchorElement | null = compiled.querySelector('a');
    const titleAttr = anchorElement!.getAttribute('title');
    const hrefAttr = anchorElement!.getAttribute('href');

    expect(anchorElement).not.toBeNull();
    expect(titleAttr).toBe('Buy me a beer');
    expect(hrefAttr).toBe('https://www.buymeacoffee.com/scottwindon');
  });
});
