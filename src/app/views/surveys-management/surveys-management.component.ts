import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BaseCondition } from '../../common';
import { SurveysService } from '../../service/api/survey.service';
import { Survey } from '../../service/model/survey-dto';
import { ShareDialog } from './surveys-shared.component';

@Component({
  selector: 'app-surveys-management',
  templateUrl: './surveys-management.component.html',
  styleUrls: ['./surveys-management.component.scss']
})
export class SurveysManagementComponent implements OnInit {
  loading = false;
  survey: Survey;
  surveys: Survey[] = new Array<Survey>()
  page = 1;
  pageSize: number;
  totalRecords: number;
  pageEvent: PageEvent;
  condition: BaseCondition<Survey> = new BaseCondition<Survey>();
  matDialogRef: MatDialogRef<ShareDialog>;
  linkShare: string = window.location.hostname+ "/#/evaluate-survey/";
  constructor(
    private surveyService: SurveysService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }
  loadAll(condi?: BaseCondition<Survey>) {
    this.loading = true
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
    
    this.loading = false
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
  OpenModal(code: string) {
    this.matDialogRef = this.matDialog.open(ShareDialog, {
      data: { linkShare: this.linkShare + code },
      disableClose: true
    });
    console.log()

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.linkShare = window.location.hostname+ "/#/evaluate-survey/";
      }
    });
  }
  onChangeStatus(code){
      this.loading = true;

      this.surveyService.getSurveyByCode(code).subscribe(res => {
      this.survey = res.item;

      this.surveyService.onChangeStatus(this.survey).subscribe(res => {
      console.log(res)

      this.loadAll();
      this.loading = false;

      })
    })
  }
}
