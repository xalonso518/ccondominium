import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaCuotaComponent } from './grafica-cuota.component';

describe('GraficaCuotaComponent', () => {
  let component: GraficaCuotaComponent;
  let fixture: ComponentFixture<GraficaCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
