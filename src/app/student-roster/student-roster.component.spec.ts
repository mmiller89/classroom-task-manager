import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRosterComponent } from './student-roster.component';

describe('StudentRosterComponent', () => {
  let component: StudentRosterComponent;
  let fixture: ComponentFixture<StudentRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentRosterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
