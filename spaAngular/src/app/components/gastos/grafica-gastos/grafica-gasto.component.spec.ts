import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaGastoComponent } from './grafica-gasto.component';

describe('GraficaGastoComponent', () => {
  let component: GraficaGastoComponent;
  let fixture: ComponentFixture<GraficaGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
