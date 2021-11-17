import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaggingDto } from '../model/pagging-dto';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContestService extends BaseApiService {
  changeUrl() {
    return 'ContestOutside';
  }

  constructor(http: HttpClient) {
    super(http)
  }

  getAllContestPagging(param: PaggingDto) : Observable<any>{
    return this.http.post(this.rootUrl + "/GetAllContestWithPaging", param);
  }

  getContestById(param: number) : Observable<any> {
    return this.http.post(this.rootUrl + "/GetContestById", param);
  }
}
