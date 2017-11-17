import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MybioregionComponent } from './mybioregion.component';

describe('MybioregionComponent', () => {
  let component: MybioregionComponent;
  let fixture: ComponentFixture<MybioregionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybioregionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MybioregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
