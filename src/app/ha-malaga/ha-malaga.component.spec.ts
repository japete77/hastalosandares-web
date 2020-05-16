import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaMalagaComponent } from './ha-malaga.component';

describe('HaMalagaComponent', () => {
  let component: HaMalagaComponent;
  let fixture: ComponentFixture<HaMalagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaMalagaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaMalagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
