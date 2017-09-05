import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManipulationComponent } from './edit-manipulation.component';

describe('EditManipulationComponent', () => {
  let component: EditManipulationComponent;
  let fixture: ComponentFixture<EditManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManipulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
