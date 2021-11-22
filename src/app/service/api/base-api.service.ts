import { HttpClient, HttpParams } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export abstract class BaseApiService {
    protected get rootUrl() {
        return 'http://35.188.14.184:59513/api/' + this.changeUrl();
        // return 'http://localhost:59513/api' + this.changeUrl();
    }

    protected http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
    }

    abstract changeUrl();
    
  public handleError(error: any) {
    // if(error.status == 401){
    //   this.router.navigate(['']); 
    // }
    // if (error.status == 403) {
    //   this.notifierService.showError(this.translate.instant('MESSAGE.403'));
    //   this.router.navigate(['']); 
    // }
    // if(error.status == 400){
    //   this.notifierService.showError(error.error.Message);
    // }
    // if(error.status == 500){
    //   this.notifierService.showError(error.error.Message);
    // }
    return Promise.reject(error);
  }
}
