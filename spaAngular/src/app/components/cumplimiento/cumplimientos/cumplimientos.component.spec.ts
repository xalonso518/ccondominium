import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumplimientosComponent } from './cumplimientos.component';

describe('CumplimientosComponent', () => {
  let component: CumplimientosComponent;
  let fixture: ComponentFixture<CumplimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumplimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumplimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
