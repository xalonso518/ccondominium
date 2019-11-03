import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaReporteAnualComponent } from './grafica-reporte-anual.component';

describe('GraficaReporteAnualComponent', () => {
  let component: GraficaReporteAnualComponent;
  let fixture: ComponentFixture<GraficaReporteAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaReporteAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaReporteAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
