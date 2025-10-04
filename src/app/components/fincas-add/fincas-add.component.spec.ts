import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FincasAddComponent } from './fincas-add.component';

describe('AgricultorAddComponent', () => {
  let component: FincasAddComponent;
  let fixture: ComponentFixture<FincasAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FincasAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FincasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
