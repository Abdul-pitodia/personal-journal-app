import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-existing-user',
  templateUrl: './existing-user.component.html',
  styleUrl: './existing-user.component.css'
})
export class ExistingUserComponent implements OnInit{
  signinForm!: FormGroup;
  errorMessage!: string | null ;
  loggedInSuccess: boolean = false;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,private errorService: ErrorService) {}

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
      }
 
    })
  }

  onSubmit(){
    if (!this.signinForm.valid) return;
    this.auth.login(this.signinForm.value)
  }
}
