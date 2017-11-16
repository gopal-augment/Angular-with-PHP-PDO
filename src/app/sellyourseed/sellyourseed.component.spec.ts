import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellyourseedComponent } from './sellyourseed.component';

describe('SellyourseedComponent', () => {
  let component: SellyourseedComponent;
  let fixture: ComponentFixture<SellyourseedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellyourseedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellyourseedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
