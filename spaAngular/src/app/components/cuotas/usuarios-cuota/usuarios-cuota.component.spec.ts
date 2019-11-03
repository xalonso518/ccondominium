import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCuotaComponent } from './usuarios-cuota.component';

describe('UsuariosCuotaComponent', () => {
  let component: UsuariosCuotaComponent;
  let fixture: ComponentFixture<UsuariosCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
