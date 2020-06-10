import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabernaMalagaComponent } from './taberna-malaga.component';

describe('TabernaMalagaComponent', () => {
  let component: TabernaMalagaComponent;
  let fixture: ComponentFixture<TabernaMalagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabernaMalagaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabernaMalagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
