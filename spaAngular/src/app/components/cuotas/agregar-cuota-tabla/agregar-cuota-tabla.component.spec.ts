import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCuotaTablaComponent } from './agregar-cuota-tabla.component';

describe('AgregarCuotaTablaComponent', () => {
  let component: AgregarCuotaTablaComponent;
  let fixture: ComponentFixture<AgregarCuotaTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCuotaTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCuotaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
