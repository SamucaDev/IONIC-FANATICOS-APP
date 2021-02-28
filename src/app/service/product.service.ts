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
export class ProductService {


  constructor(private httpClient: HttpClient) { }


  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  endpoint = 'http://localhost:1533';

  getFirst(): Observable<User> {
    return this.httpClient.post<User>(this.endpoint + '/product/getfirst', this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  getProduct(data): Observable<User> {
    console.log(data);
    return this.httpClient.post<User>(this.endpoint + '/product/get', JSON.stringify(data), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  findProduct(data): Observable<User> {
    console.log(data);
    return this.httpClient.post<User>(this.endpoint + '/product/find', JSON.stringify(data), this.httpHeader)
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
