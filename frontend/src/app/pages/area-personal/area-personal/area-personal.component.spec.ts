import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPersonalComponent } from './area-personal.component';

describe('AreaPersonalComponent', () => {
  let component: AreaPersonalComponent;
  let fixture: ComponentFixture<AreaPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
