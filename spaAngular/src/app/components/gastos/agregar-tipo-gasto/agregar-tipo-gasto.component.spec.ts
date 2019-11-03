import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoGastoComponent } from './agregar-tipo-gasto.component';

describe('AgregarTipoGastoComponent', () => {
  let component: AgregarTipoGastoComponent;
  let fixture: ComponentFixture<AgregarTipoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
