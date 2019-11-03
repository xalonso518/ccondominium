import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCumplimientoComponent } from './tipos-cumplimiento.component';

describe('TiposCumplimientoComponent', () => {
  let component: TiposCumplimientoComponent;
  let fixture: ComponentFixture<TiposCumplimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposCumplimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposCumplimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
