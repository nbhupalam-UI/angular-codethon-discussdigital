import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  getUserProfile(id: string): Observable<any> {
    let result = this.http.get<Object>(`/api/userprofile/?id=${id}`);
    return result;
  }
  getUserQuestions(id: string): Observable<any> {
    let result = this.http.get<Object>(`/api/getUserQuestions/?id=${id}`);
    return result;
  }
}
