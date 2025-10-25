import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPutComponent } from './clientes-put.component';

describe('ClientesPutComponent', () => {
  let component: ClientesPutComponent;
  let fixture: ComponentFixture<ClientesPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
