import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetByUserPagging, PaggingDto } from '../model/pagging-dto';
import { RecipeDto } from '../model/recipe-dto';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseApiService {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  changeUrl() {
    return 'RecipesOutside';
  }

  getAllPagging(param: PaggingDto) : Observable<any>{
    return this.http.post(this.rootUrl + '/GetAllRecipesWithPaging', param)
  }

  getAllNotPagging() : Observable<any> {
    return this.http.get(this.rootUrl + '/GetListRecipe');
  }

  getRecipeById(param: number): Observable<any> {
    return this.http.post(this.rootUrl + '/GetRecipeById', param)
  }

  getRecipeByUserId(param: GetByUserPagging): Observable<any> {
    return this.http.post(this.rootUrl + '/GetAllRecipesByUserIdWithPaging', param)
  }

  /**
   * @description Add new Recipe
   * 
   * @param param RecipeDTO
   */
  addNewRecipe(param: RecipeDto): Observable<any> {
    return this.http.post(this.rootUrl + '/AddNewRecipe', param);
  }
  getAllSimilar(param: number) : Observable<any> {
    return this.http.post(this.rootUrl + '/GetRecipeSimilar', param )
  }
}
