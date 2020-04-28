import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMapComponent } from './delivery-map.component';

describe('DeliveryMapComponent', () => {
  let component: DeliveryMapComponent;
  let fixture: ComponentFixture<DeliveryMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
