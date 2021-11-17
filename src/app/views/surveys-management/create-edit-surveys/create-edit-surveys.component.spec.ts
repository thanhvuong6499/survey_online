import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSurveysComponent } from './create-edit-surveys.component';

describe('CreateEditSurveysComponent', () => {
  let component: CreateEditSurveysComponent;
  let fixture: ComponentFixture<CreateEditSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSurveysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
