import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoAddComponent } from './insumo-add.component';

describe('InsumoAddComponent', () => {
  let component: InsumoAddComponent;
  let fixture: ComponentFixture<InsumoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsumoAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
