import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../services/error.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-existing-user',
  templateUrl: './existing-user.component.html',
  styleUrl: './existing-user.component.css'
})
export class ExistingUserComponent implements OnInit{
  signinForm!: FormGroup;
  errorMessage!: string | null ;
  loggedInSuccess: boolean = false;
  loginAttempts: number = 0;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,private errorService: ErrorService, private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
    this.signinForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.errorService.error$.subscribe((errorMessage) => {
      if (errorMessage != null) this.errorMessage = errorMessage;
    });

    this.auth.userLoggedIn.subscribe((data) => {
      this.loggedInSuccess = data;
      if (this.loggedInSuccess){
        this.signinForm.reset();
        this.router.navigate(['/home']);
        this.loginAttempts = 0;
      }
      else if (this.loginAttempts > 0 && this.loggedInSuccess === false){
        this._snackBar.open("Login Failed, please validate username or password", "Close", {
          duration: 5000
        })
      }
 
    })
  }

  onSubmit(){
    if (!this.signinForm.valid) return;
    this.auth.login(this.signinForm.value)
    this.loginAttempts++;
  }
}
