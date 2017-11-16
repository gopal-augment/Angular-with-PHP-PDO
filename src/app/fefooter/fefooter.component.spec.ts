import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FefooterComponent } from './fefooter.component';

describe('FefooterComponent', () => {
  let component: FefooterComponent;
  let fixture: ComponentFixture<FefooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FefooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FefooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
