import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditSurveysComponent } from './create-edit-surveys/create-edit-surveys.component';
import { SurveysManagementComponent } from './surveys-management.component';


const routes: Routes = [
  {
    path: '',
    component: SurveysManagementComponent,
    data: {
      title: 'Surveys Management'
    },
    // children: [
    //   {
    //     path: 'surveys',
    //     redirectTo: 'surveys'
    //   },
    //   {
    //     path: 'create-survey',
    //     component:CreateEditSurveysComponent,
    //     data: {
    //       title:'Create Survey'
    //     }
    //   }
    // ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
