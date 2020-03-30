import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoodleAreaComponent } from './doodle-area.component';

describe('DoodleAreaComponent', () => {
  let component: DoodleAreaComponent;
  let fixture: ComponentFixture<DoodleAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoodleAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoodleAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
