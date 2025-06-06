import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorPutComponent } from './proveedor-put.component';

describe('ProveedorPutComponent', () => {
  let component: ProveedorPutComponent;
  let fixture: ComponentFixture<ProveedorPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
