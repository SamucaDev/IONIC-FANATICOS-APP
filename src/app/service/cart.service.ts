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
export class CartService {

  constructor(private httpClient: HttpClient) { }


  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + (localStorage.getItem('U_T'))
    })
  }

  endpoint = 'http://localhost:1533';

  addItem(data): Observable<User> {
    return this.httpClient.post<User>(this.endpoint + '/cart/add', JSON.stringify(data), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  getItemsCart(): Observable<User> {
    var userid = localStorage.getItem('U_D');

    return this.httpClient.post<User>(this.endpoint + '/cart/getItem', JSON.stringify({ userid: userid }), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }


  clear(data): Observable<User> {
    var userid = localStorage.getItem('U_D');

    return this.httpClient.post<User>(this.endpoint + '/cart/clear', JSON.stringify({ cartid: data }), this.httpHeader)
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
