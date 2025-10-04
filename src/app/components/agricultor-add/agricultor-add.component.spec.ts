import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultorAddComponent } from './agricultor-add.component';

describe('AgricultorAddComponent', () => {
  let component: AgricultorAddComponent;
  let fixture: ComponentFixture<AgricultorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultorAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
