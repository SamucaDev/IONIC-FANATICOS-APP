import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class User {
  id: string;
  name: string;
  email: string;
  phone: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  endpoint = 'http://localhost:1533';

  registerUser(data): Observable<User> {
    return this.httpClient.post<User>(this.endpoint + '/user/register', JSON.stringify(data), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }
  
  login(data): Observable<User> {
    return this.httpClient.post<User>(this.endpoint + '/user/login', JSON.stringify(data), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }


  processError(err) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }

}
