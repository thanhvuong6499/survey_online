import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../common';
import { UserService } from '../../service/api/user.service';
import { User } from '../../service/model/user-dto';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  users: User[] = [];
  user: User;
  page = 1;
  pageSize: number;
  totalRecords: number;
  condition: BaseCondition<User> = new BaseCondition<User>();

  constructor(
    private _service: UserService,
  ) { }

  ngOnInit() {
    this.loadAll()
  }
  loadAll(condi?: BaseCondition<User>) {
    this._service.getAllUsersWithPaging(condi).subscribe((result) => {
      if (result.errorCode == "") {
        this.users = result.itemList;
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
    var condition: BaseCondition<User> = new BaseCondition<User>();
    if (this.condition.FilterRuleList) {
      condition.FilterRuleList = this.condition.FilterRuleList;
    }
    condition.PageIndex = page;
    condition.PageSize = pageSize || 5;
    
    this.loadAll(condition);
    console.log(condition);
  }

  // stringToDate(input){
  //   const options = {year: 'numeric', month: 'long', day: 'numeric' };
  //   const today = new Date(input);
  //   return today.toLocaleDateString("en-US", options);
  // }
  onActive(id){
    this._service.getById(id).subscribe(res => {
      this.user = res.item;
      this._service.updateUser(this.user).subscribe(res => {
        console.log(res);
      this.loadAll();

      })
    })
  }
}