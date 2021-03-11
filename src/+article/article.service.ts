import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable({
  providedIn: "root"
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(id: string): Observable<any> {
    let result = this.http.get<Object>(`/api/article/?id=${id}`);
    return result;
  }
  postComment(obj: object): Observable<any> {
    let result = this.http.post<Object>("/api/article/comment", obj);
    return result;
  }
  dislikeComment(obj: object): Observable<any> {
    let result = this.http.post<Object>("/api/dislikecomment", obj);
    return result;
  }
  likeComment(obj: object): Observable<any> {
    let result = this.http.post<Object>("/api/likecomment", obj);
    return result;
  }
  dislikeQuestion(obj: object): Observable<any> {
    let result = this.http.post<Object>("/api/dislikequestion", obj);
    return result;
  }
  likeQuestion(obj: object): Observable<any> {
    let result = this.http.post<Object>("/api/likequestion", obj);
    return result;
  }
}
