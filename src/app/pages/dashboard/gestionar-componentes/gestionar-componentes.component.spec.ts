import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarComponentesComponent } from './gestionar-componentes.component';

describe('GestionarComponentesComponent', () => {
  let component: GestionarComponentesComponent;
  let fixture: ComponentFixture<GestionarComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarComponentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
