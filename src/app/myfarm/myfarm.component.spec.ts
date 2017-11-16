import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfarmComponent } from './myfarm.component';

describe('MyfarmComponent', () => {
  let component: MyfarmComponent;
  let fixture: ComponentFixture<MyfarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
