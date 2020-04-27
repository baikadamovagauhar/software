import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinyComponent } from './magaziny.component';

describe('MagazinyComponent', () => {
  let component: MagazinyComponent;
  let fixture: ComponentFixture<MagazinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
