import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComponenteComponent } from './detalle-componente.component';

describe('DetalleComponenteComponent', () => {
  let component: DetalleComponenteComponent;
  let fixture: ComponentFixture<DetalleComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleComponenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
