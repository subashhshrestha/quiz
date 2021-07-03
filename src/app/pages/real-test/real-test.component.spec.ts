import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTestComponent } from './real-test.component';

describe('RealTestComponent', () => {
  let component: RealTestComponent;
  let fixture: ComponentFixture<RealTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
