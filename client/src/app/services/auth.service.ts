import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BackendService } from './backend.service';
import { EnvironmentService } from './environment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { ResponseModel } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLoggedIn = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn: boolean = false;
  private apiUrl!: string;
  private _token: string = "";

  constructor(private envService : EnvironmentService, private http: HttpClient) {
    
    this.envService.envLoaded.subscribe((data) => {
      this.apiUrl = this.envService.apiUrl;
    })
   }

  get token(): string | null {
    return this._token;
  }

  login(existingUser: any): void{
    this._login(existingUser).subscribe((data: ResponseModel) => {
      localStorage.setItem('token', data.data["token"]);
      
      localStorage.setItem('userId', data.data.user.userId)
      this.userLoggedIn.next(true)
      this.isUserLoggedIn = true;
    }, 
    (error) => {
      this.userLoggedIn.next(false)
      this.isUserLoggedIn = false;
    })
  }

  logout(){
    this._token = "";
    this.userLoggedIn.next(false);
    this.isUserLoggedIn = false;
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  private _login(existingUser: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ResponseModel>(`${this.apiUrl}authenticate`, existingUser, { headers });
  }

  signUp(newUser: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(`${this.apiUrl}user/create`, newUser, { headers });
  }

  
}
