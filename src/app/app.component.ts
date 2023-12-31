import { Component } from '@angular/core';
import { BackendService } from './services/backend.service';
import { Memory } from './models/Memory';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  userLoggedIn: boolean = false;

  constructor(private service : BackendService, private sharedService:SharedService,  private router: Router, private auth: AuthService){}

  ngOnInit(): void {
    this.auth.userLoggedIn.subscribe((data) => {
      this.userLoggedIn = data;
    })
  }

  navigate(routeUrl: string){
    this.router.navigate([routeUrl]);
  }

  logout(routeUrl: string){
    this.auth.logout();
    this.router.navigate([routeUrl]);
  }
}
