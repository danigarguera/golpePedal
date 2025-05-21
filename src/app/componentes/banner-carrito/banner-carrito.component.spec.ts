import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCarritoComponent } from './banner-carrito.component';

describe('BannerCarritoComponent', () => {
  let component: BannerCarritoComponent;
  let fixture: ComponentFixture<BannerCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
