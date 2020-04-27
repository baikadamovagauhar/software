import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RozygrywComponent } from './rozygryw.component';

describe('RozygrywComponent', () => {
  let component: RozygrywComponent;
  let fixture: ComponentFixture<RozygrywComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RozygrywComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RozygrywComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
