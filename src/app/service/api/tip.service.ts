import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetByUserPagging, PaggingDto } from '../model/pagging-dto';
import { AddNewTipDto } from '../model/tip-dto';
import { BaseApiService } from './base-api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipService extends BaseApiService {
  
  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  changeUrl() {
    return 'TipsOutside';
  }

  getAllPagging(param: PaggingDto): Observable<any> {
    return this.http.post(this.rootUrl + '/GetAllTipWithPaging', param);
  }

  getById(param : number): Observable<any>{
    return this.http.post(this.rootUrl + '/GetTipById', param);
  }

  // getTipByUserId(param: number): Observable<any> {
  //   return this.http.post(this.rootUrl + '/GetAllRecipesByUserIdWithPaging', param)
  // }

  addNewTip(param: AddNewTipDto): Observable<any> {
    return this.http.post(this.rootUrl + '/AddNewTip', param);
  }

  getTipByUserId(param: GetByUserPagging): Observable<any> {
    return this.http.post(this.rootUrl + '/GetAllTipsByUserIdWithPaging', param)
  }
}
