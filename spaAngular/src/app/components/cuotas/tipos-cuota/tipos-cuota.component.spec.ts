import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCuotaComponent } from './tipos-cuota.component';

describe('TiposCuotaComponent', () => {
  let component: TiposCuotaComponent;
  let fixture: ComponentFixture<TiposCuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposCuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
