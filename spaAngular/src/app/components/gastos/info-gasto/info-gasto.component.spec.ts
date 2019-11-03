import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGastoComponent } from './info-gasto.component';

describe('InfoGastoComponent', () => {
  let component: InfoGastoComponent;
  let fixture: ComponentFixture<InfoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
