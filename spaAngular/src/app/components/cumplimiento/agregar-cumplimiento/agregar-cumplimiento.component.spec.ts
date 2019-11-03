import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCumplimientoComponent } from './agregar-cumplimiento.component';

describe('AgregarCumplimientoComponent', () => {
  let component: AgregarCumplimientoComponent;
  let fixture: ComponentFixture<AgregarCumplimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCumplimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCumplimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
