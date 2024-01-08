import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService,  private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(){
    if (!this.signupForm.valid) return;
    
    this.auth.signUp(this.signupForm.value).subscribe((data) => {
      this.signupForm.reset(); 
      this._snackBar.open("Signed up successfully, please Login", "OK", {
        duration: 3000
      })
    }, (error) => {
      this._snackBar.open("Error occurred, please try different username or wait for sometime", "OK", {
        duration: 3000
      })
    })
  }




  

}
