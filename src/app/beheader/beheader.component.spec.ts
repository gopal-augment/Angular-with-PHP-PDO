import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeheaderComponent } from './beheader.component';

describe('BeheaderComponent', () => {
  let component: BeheaderComponent;
  let fixture: ComponentFixture<BeheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
