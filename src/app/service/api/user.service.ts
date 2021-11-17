import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl, BaseCondition, HttpHeadersOptions, ReturnResult } from '../../common';
import { User } from '../model/user-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient : HttpClient) { }
  public getAllUsersWithPaging(condi? : BaseCondition<User>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        FilterRuleList: condi.FilterRuleList
      }
    }
    else {
      condition = {
        PageIndex : 1,
        PageSize: 5
      }

    }
    return this.httpClient.post<ReturnResult<User>>(ApiUrl.apiUrl + 'UserOutside/GetAllUserWithPaging',JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }
  getById(param : number): Observable<any>{
    return this.httpClient.post(ApiUrl.apiUrl + 'UserOutside/GetUserById', param);
  }
  updateUser(param: User): Observable<any> {
    return this.httpClient.post(ApiUrl.apiUrl + 'UserOutside/ActiveUser', param);
  }
}