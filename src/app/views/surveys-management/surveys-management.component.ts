import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BaseCondition } from '../../common';
import { SurveysService } from '../../service/api/survey.service';
import { Survey } from '../../service/model/survey-dto';

@Component({
  selector: 'app-surveys-management',
  templateUrl: './surveys-management.component.html',
  styleUrls: ['./surveys-management.component.scss']
})
export class SurveysManagementComponent implements OnInit {

  survey: Survey;
  surveys: Survey[] = new Array<Survey>()
  page = 1;
  pageSize: number;
  totalRecords: number;
  pageEvent: PageEvent;
  condition: BaseCondition<Survey> = new BaseCondition<Survey>();
  constructor(
    private surveyService: SurveysService
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }
  loadAll(condi?: BaseCondition<Survey>) {
   
    this.surveyService.getAllSurveysWithPaging(condi).subscribe((result) => {
      if (result.errorCode == "") {
        this.surveys = result.itemList;
        this.totalRecords = result.totalRows;
        if (condi != undefined) {
          this.pageSize = condi.PageSize;
          this.page = condi.PageIndex;
        }
        else {
          this.pageSize = 5;
          this.page = 1;
        }
      }
      else {
        alert("Lỗi: " + result.errorMessage);
      }

    }, (error) => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
      }, 5000);
    }, () => {
    });
    
    
  }
  loadPages(page: number, pageSize: number) {
    debugger
    var condition: BaseCondition<Survey> = new BaseCondition<Survey>();
    if (this.condition.FilterRuleList) {
      condition.FilterRuleList = this.condition.FilterRuleList;
    }
    condition.PageIndex = page;
    condition.PageSize = pageSize || 5;
    
    this.loadAll(condition);
    console.log(condition);
  }

  // onDelete(id){
  //   this.surveyService.deleteRecipe(id).subscribe(res=>{
  //     this.loadAll();
  //   })
  // }
}
