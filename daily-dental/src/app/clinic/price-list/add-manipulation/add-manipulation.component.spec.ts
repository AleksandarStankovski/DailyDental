import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManipulationComponent } from './add-manipulation.component';

describe('AddManipulationComponent', () => {
  let component: AddManipulationComponent;
  let fixture: ComponentFixture<AddManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManipulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
