import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponenteComponent } from './formulario-componente.component';

describe('FormularioComponenteComponent', () => {
  let component: FormularioComponenteComponent;
  let fixture: ComponentFixture<FormularioComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioComponenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
