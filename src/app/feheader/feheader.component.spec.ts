import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeheaderComponent } from './feheader.component';

describe('FeheaderComponent', () => {
  let component: FeheaderComponent;
  let fixture: ComponentFixture<FeheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
