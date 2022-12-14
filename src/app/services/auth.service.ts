import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, reduce, tap } from "rxjs/operators";
import { User } from '../models/user.model';

export interface AuthResponseData{
  kind: string;
  token: string;
  idToken: string;
  username: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  success: number;
  address: string;
  afm: string;
  city: string;
  doy: string;
  name: string;
  phone1: string;
  phone2: string;
  zip: string;
  registered?: boolean;
  isAdmin:number;
  id:number;

  trdr:number

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new Subject<boolean>();
  cast = this.loggedIn.asObservable();
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  error = new Subject<any>();
  castError = this.error.asObservable();

  sendError(err: any){
    this.error.next(err);
  }

  showSnack = new Subject<boolean>();
  castShowSnack = this.showSnack.asObservable();

  sendShowSnack(flag: boolean){
    this.showSnack.next(flag);
  }

  sendLoggedIn(flag: boolean){
    this.loggedIn.next(flag);
  }

  isAuth:boolean = false;
  isAdmin:boolean = false;
  setAuthentication(value:boolean){
    this.isAuth = value;
  }
  getAuthentication():boolean
  {
    return this.isAuth;
  }
  setAdmin(value:boolean){
    this.isAdmin = value;
  }
  getAdmin():boolean{
    return this.isAdmin;
  }

  caughtError(err: any): Observable<any>{
    // console.log(err);
    
    this.sendError(err);

    return throwError(err);
  }

  login(username: string, password: string){
    console.log(username);
    console.log(password)
    return this.http.post<AuthResponseData>(
      'https://michelinNodeRest.vinoitalia.gr/auth/login',
      {
        name: username,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError((err: any) => { return this.caughtError(err); }), tap(resData => {

      console.log(resData)
      
      if(resData.isAdmin ==0){


        localStorage.setItem("username", resData.name);
        this.setAdmin(false);
        console.log(resData.trdr)
      }
       else{
         localStorage.setItem("username","Admin")
        this.setAdmin(true);

      }

      this.handleAuthentication(resData.username,resData.id,resData.token,600,resData.address,this.getAdmin());


      })
    );
  }

  logout(){

    this.user.next(null);
    // console.log("hello");
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));


    localStorage.removeItem('userData');
    localStorage.removeItem('username');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    window.location.reload();


  }

  autoLogin(){


    const userData: {
      username: string,
      id: number,
      _token: string,
      _tokenExpirationDate: string,
      address: string,
     isAdmin:boolean

    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if(!userData){
      return;
    }else{
      let expiresIn = 600;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * 6);
      console.log(expirationDate);

      const user = new User(userData.username, userData.id, userData._token , expirationDate,userData.address,userData.isAdmin);
      this.user.next(user);
      // this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }

    const loadedUser = new User(userData.username,userData.id,userData._token, new Date(userData._tokenExpirationDate),userData.address,userData.isAdmin);

    console.log(new Date().getTime());


    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expirationDuration);


      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration/6000);
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'username_EXISTS':
        errorMessage = 'This username already exists.';
        break;
      case 'username_NOT_FOUND':
        errorMessage = 'This username does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(username: string, userId: number, token: string, expiresIn: number,address: string,isAdmin:boolean){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * 6);
    console.log(expirationDate);

    const user = new User(username, userId, token , expirationDate,address,isAdmin);
    this.user.next(user);
    console.log(user)
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    setTimeout(() => {
      this.sendShowSnack(true);
    },2100)

    this.autoLogin();

  }
}











