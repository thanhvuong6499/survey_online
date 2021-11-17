import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysManagementComponent } from './surveys-management.component';

describe('SurveysManagementComponent', () => {
  let component: SurveysManagementComponent;
  let fixture: ComponentFixture<SurveysManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveysManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
