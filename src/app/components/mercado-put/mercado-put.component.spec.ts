import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPutComponent } from './mercado-put.component';

describe('MercadoPutComponent', () => {
  let component: MercadoPutComponent;
  let fixture: ComponentFixture<MercadoPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadoPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercadoPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
