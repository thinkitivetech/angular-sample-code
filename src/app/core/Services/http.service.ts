import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { pluck } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  POST_DATA<T>(apiURL: string, postObject: any): Observable<T> {
    return this.http.post<T>(apiURL, postObject).pipe(pluck('responsePayload'));
  }

  PUT_DATA<T>(apiURL: string, postObject: any): Observable<T> {
    return this.http.put<T>(apiURL, postObject).pipe(pluck('responsePayload'));;
  }

  GET_DATA<T>(apiURL: string): Observable<T> {
    return this.http.get<T>(`${apiURL}`).pipe(pluck('responsePayload'));
  }

  DELETE_DATA<T>(apiURL: string): Observable<T> {
    return this.http.delete<T>(`${apiURL}`).pipe(pluck('responsePayload'));
  }
}
