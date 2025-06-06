import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultoresListComponent } from './agricultores-list.component';

describe('AgricultoresListComponent', () => {
  let component: AgricultoresListComponent;
  let fixture: ComponentFixture<AgricultoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultoresListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
