import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGastoComponent } from './agregar-gasto.component';

describe('AgregarGastoComponent', () => {
  let component: AgregarGastoComponent;
  let fixture: ComponentFixture<AgregarGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
