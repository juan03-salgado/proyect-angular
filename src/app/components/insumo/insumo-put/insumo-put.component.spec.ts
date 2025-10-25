import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoPutComponent } from './insumo-put.component';

describe('InsumoPutComponent', () => {
  let component: InsumoPutComponent;
  let fixture: ComponentFixture<InsumoPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsumoPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
