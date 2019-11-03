import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoCuotaComponent } from './agregar-tipo-cuota.component';

describe('AgregarTipoCuotaComponent', () => {
  let component: AgregarTipoCuotaComponent;
  let fixture: ComponentFixture<AgregarTipoCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
