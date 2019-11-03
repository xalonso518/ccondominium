import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCuotaComponent } from './info-cuota.component';

describe('InfoCuotaComponent', () => {
  let component: InfoCuotaComponent;
  let fixture: ComponentFixture<InfoCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
