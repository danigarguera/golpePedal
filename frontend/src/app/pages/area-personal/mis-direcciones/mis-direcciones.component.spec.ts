import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDireccionesComponent } from './mis-direcciones.component';

describe('MisDireccionesComponent', () => {
  let component: MisDireccionesComponent;
  let fixture: ComponentFixture<MisDireccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisDireccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
