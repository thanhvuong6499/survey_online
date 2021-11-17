import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SurveysRoutingModule } from './surveys-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SurveysManagementComponent } from './surveys-management.component';
import { CreateEditSurveysComponent } from './create-edit-surveys/create-edit-surveys.component';
import { MaterialModule } from '../../common/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatContenteditableModule } from 'mat-contenteditable';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToastrModule } from 'ngx-toastr';
import { EvaluateSurveyComponent } from './survey-evaluate/survey-evaluate.component';

@NgModule({
  imports: [
    CommonModule,
    SurveysRoutingModule,
    ChartsModule,
    BsDropdownModule,
    // BrowserModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatContenteditableModule,
    
  ],
  declarations: [ SurveysManagementComponent,CreateEditSurveysComponent,EvaluateSurveyComponent]
})
export class SurveysModule { }
