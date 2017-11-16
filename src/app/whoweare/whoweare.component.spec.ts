import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoweareComponent } from './whoweare.component';

describe('WhoweareComponent', () => {
  let component: WhoweareComponent;
  let fixture: ComponentFixture<WhoweareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoweareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoweareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
