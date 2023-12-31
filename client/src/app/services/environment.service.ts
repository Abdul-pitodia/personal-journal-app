import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private configUrl = 'assets/config.json';

  public envConfig: any;

  private envLoaded$ = new BehaviorSubject<boolean>(false);
  public envLoaded = this.envLoaded$.asObservable();

  constructor(private http: HttpClient) {}

  public initializeEnv(): Promise<any> {
    return this.http
      .get(this.configUrl)
      .toPromise()
      .then((data: any) => {
        this.envConfig = data;
        this.envLoaded$.next(true);
      })
      .catch((error) => {
      });
  }

  get apiUrl(): string {
    return this.envConfig?.apiUrl || '';
  }
}
