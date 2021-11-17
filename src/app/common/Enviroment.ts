import { HttpHeaders } from '@angular/common/http';

export const ApiUrl = {
    apiUrl: "https://localhost:44357/api/",
    prod: true
};

export const HttpHeadersOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

export const CacheHeaders = {
    headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    })
}

export const HttpHeaderOptionsFormData = {
    headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*'
    })
}