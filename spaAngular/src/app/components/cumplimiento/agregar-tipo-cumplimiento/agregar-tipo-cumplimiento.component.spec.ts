import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoCumplimientoComponent } from './agregar-tipo-cumplimiento.component';

describe('AgregarTipoCumplimientoComponent', () => {
  let component: AgregarTipoCumplimientoComponent;
  let fixture: ComponentFixture<AgregarTipoCumplimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoCumplimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoCumplimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
