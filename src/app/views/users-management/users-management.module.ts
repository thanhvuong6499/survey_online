import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UsersRoutingModule } from './users-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    // BrowserModule,
    NgbModule

  ],
  declarations: [ UsersManagementComponent ]
})
export class UsersModule { }
