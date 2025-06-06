import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoAddComponent } from './mercado-add.component';

describe('MercadoAddComponent', () => {
  let component: MercadoAddComponent;
  let fixture: ComponentFixture<MercadoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadoAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercadoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
