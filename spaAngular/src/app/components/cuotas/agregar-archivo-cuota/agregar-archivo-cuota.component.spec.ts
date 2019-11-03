import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArchivoCuotaComponent } from './agregar-archivo-cuota.component';

describe('AgregarArchivoCuotaComponent', () => {
  let component: AgregarArchivoCuotaComponent;
  let fixture: ComponentFixture<AgregarArchivoCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarArchivoCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarArchivoCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
