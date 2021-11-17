import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseApiService {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  changeUrl() {
    return 'CategoryOutside';
  }

  getAllNameCategory() : Observable<any> {
    return this.http.get(this.rootUrl + '/GetAllNameCategory');
  }
  getAllIconCategory() : Observable<any> {
    return this.http.get(this.rootUrl + '/GetAllIconCategory');
  }
}
