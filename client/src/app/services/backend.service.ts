import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Memory } from '../models/Memory';
import { EnvironmentService } from './environment.service';
import { ResponseModel } from '../models/response';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { Tag } from '../models/Tag';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl!: string;

  private userId!: string | null;

  constructor(private http: HttpClient, private envService : EnvironmentService, private auth: AuthService) {    
    this.envService.envLoaded.subscribe((data) => {
      this.apiUrl = this.envService.apiUrl;
    })

    this.auth.userLoggedIn.subscribe((data) => {
      this.userId = localStorage.getItem('userId');
    })
  }

  getMemories(): Observable<ResponseModel> {
      return this.http.get<ResponseModel>(`${this.apiUrl}memory/fetchMemories/${this.userId}`).pipe(
        catchError(this.handleError)
      );
  }

  createMemory(memory: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ResponseModel>(`${this.apiUrl}memory/create/${this.userId}`, memory, { headers });
  }

  
  updateMemory(memory: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ResponseModel>(`${this.apiUrl}memory/update/${this.userId}`, memory, { headers });
  }

  deleteMemory(userId: string, memoryId: string){
    const deleteUrl = `${this.apiUrl}memory/delete/${this.userId}/${memoryId}`;
    return this.http.delete(deleteUrl);
  }

  getAvailableTags(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}tags/${this.userId}/fetch`).pipe(
      catchError(this.handleError)
    );
  }

  
  createTag(tagName: string): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}tags/create/${this.userId}/${tagName}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteTag(tag: Tag): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(`${this.apiUrl}tags/delete/${this.userId}/${tag.id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    throw error; 
  }
}
