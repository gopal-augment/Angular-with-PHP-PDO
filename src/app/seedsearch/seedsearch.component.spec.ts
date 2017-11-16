import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedsearchComponent } from './seedsearch.component';

describe('SeedsearchComponent', () => {
  let component: SeedsearchComponent;
  let fixture: ComponentFixture<SeedsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
