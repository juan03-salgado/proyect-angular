import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPutComponent } from './product-put.component';

describe('ProductPutComponent', () => {
  let component: ProductPutComponent;
  let fixture: ComponentFixture<ProductPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
