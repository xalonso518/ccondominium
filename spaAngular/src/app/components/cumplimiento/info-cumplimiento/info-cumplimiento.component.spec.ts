import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCumplimientoComponent } from './info-cumplimiento.component';

describe('InfoCumplimientoComponent', () => {
  let component: InfoCumplimientoComponent;
  let fixture: ComponentFixture<InfoCumplimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCumplimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCumplimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
