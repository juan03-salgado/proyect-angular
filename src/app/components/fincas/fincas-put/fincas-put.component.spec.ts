import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultorPutComponent } from './fincas-put.component';

describe('AgricultorPutComponent', () => {
  let component: AgricultorPutComponent;
  let fixture: ComponentFixture<AgricultorPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultorPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultorPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
