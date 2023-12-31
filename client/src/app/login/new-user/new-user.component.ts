import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}


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
    })
  }




  

}
