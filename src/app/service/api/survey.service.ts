import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl, BaseCondition, ReturnResult,HttpHeadersOptions } from '../../common';
import { GetByUserPagging, PaggingDto } from '../model/pagging-dto';
import { RecipeDto } from '../model/recipe-dto';
import { Survey } from '../model/survey-dto';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysService extends BaseApiService {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  changeUrl() {
    return 'SurveysOutside';
  }

  getAllPagging(param: PaggingDto): Observable<any> {
    return this.http.post(this.rootUrl + '/GetAllSurveysWithPaging', param)
  }
  public getAllSurveysWithPaging(condi?: BaseCondition<Survey>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex: condi.PageIndex,
        PageSize: 5,
        FilterRuleList: condi.FilterRuleList
      }
    }
    else {
      condition = {
        PageIndex: 1,
        PageSize: 5
      }

    }
    return this.http.post<ReturnResult<Survey>>(ApiUrl.apiUrl + 'SurveysOutside/GetAllSurveysWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }
  getAllNotPagging(): Observable<any> {
    return this.http.get(this.rootUrl + '/GetListRecipe');
  }

  getSurveyByCode(param: string):Promise<any> {
    return this.http.post(this.rootUrl + `/GetSurveyByCode?code=${param}`, { headers: HttpHeadersOptions.headers })
    .pipe(catchError((err) => this.handleError(err)))
    .toPromise();
  }

  getSurveyByUserId(param: GetByUserPagging): Observable<any> {
    return this.http.post(this.rootUrl + '/GetAllRecipesByUserIdWithPaging', param)
  }

  /**
   * @description Add new Survey
   * 
   * @param param SurveyDto
   */
  addNewSurvey(param: Survey): Observable<any> {
    return this.http.post(this.rootUrl + '/AddNewSurvey', param);
  }
  getAllSimilar(param: number): Observable<any> {
    return this.http.post(this.rootUrl + '/GetRecipeSimilar', param)
  }
}
