import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BefooterComponent } from './befooter.component';

describe('BefooterComponent', () => {
  let component: BefooterComponent;
  let fixture: ComponentFixture<BefooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BefooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BefooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
