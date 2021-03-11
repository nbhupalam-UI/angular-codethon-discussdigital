import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable({
  providedIn: "root"
})
export class AskService {
  constructor(private http: HttpClient) {}

  ask(obj: Object): Observable<any> {
    return this.http.post<Object>("/api/ask", obj);
  }
}
