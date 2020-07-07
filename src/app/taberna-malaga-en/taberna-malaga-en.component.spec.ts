import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabernaMalagaEnComponent } from './taberna-malaga-en.component';

describe('TabernaMalagaEnComponent', () => {
  let component: TabernaMalagaEnComponent;
  let fixture: ComponentFixture<TabernaMalagaEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabernaMalagaEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabernaMalagaEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
