import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FincasListComponent } from './fincas-list.component';

describe('AgricultoresListComponent', () => {
  let component: FincasListComponent;
  let fixture: ComponentFixture<FincasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FincasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FincasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
