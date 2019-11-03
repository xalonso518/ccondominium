import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArchivoGastoComponent } from './agregar-archivo-gasto.component';

describe('AgregarArchivoGastoComponent', () => {
  let component: AgregarArchivoGastoComponent;
  let fixture: ComponentFixture<AgregarArchivoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarArchivoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarArchivoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
