import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAvisoComponent } from './agregar-aviso.component';

describe('AgregarAvisoComponent', () => {
  let component: AgregarAvisoComponent;
  let fixture: ComponentFixture<AgregarAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
