import { HttpHeaders } from '@angular/common/http';

export const ApiUrl = {
    // apiUrl: "http://localhost:59513/api/",
    // prod: true
    apiUrl:  "http://35.188.14.184:59513/api/",
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
        'Accept': '*/*',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Expose-Headers": "xsrf-token"
    })
}