import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDireccionComponent } from './seleccionar-direccion.component';

describe('SeleccionarDireccionComponent', () => {
  let component: SeleccionarDireccionComponent;
  let fixture: ComponentFixture<SeleccionarDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarDireccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
