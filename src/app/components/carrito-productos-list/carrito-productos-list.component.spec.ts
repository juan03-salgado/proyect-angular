import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoProductosListComponent } from './carrito-productos-list.component';

describe('CarritoProductosListComponent', () => {
  let component: CarritoProductosListComponent;
  let fixture: ComponentFixture<CarritoProductosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoProductosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoProductosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
