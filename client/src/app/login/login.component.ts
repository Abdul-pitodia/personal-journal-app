import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  isUserLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.userLoggedIn.subscribe((data) => {
      this.isUserLoggedIn = data;
    })
  }


  navigate(url: string) {
    const currentRoute = this.route.snapshot;

    const currentUrlSegments = currentRoute.pathFromRoot
      .map((segment) => segment.url.join('/'))
      .join('/');

    const newRoute = `${currentUrlSegments}/${url}`;    

    this.router.navigateByUrl(newRoute);
  }
}
