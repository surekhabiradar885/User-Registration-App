import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

//import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  authForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
   
  ) { }

  ngOnInit() {  
    this.authForm = new FormGroup({
      'userData': new FormGroup({
        'name': new FormControl(null, [Validators.required,]),
        'email': new FormControl(null, [Validators.required, Validators.email],),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6),])
      }, {
        validators: [this.passwordConfirming]
      }),
     
    });
    this.authForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  // convenience getter for easy access to form fields
 /*  get f() { return this.authForm.controls; } */

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.get('userData.email').value
    const passsword = this.authForm.get('userData.password').value
    const name = this.authForm.get('userData.name').value
    this.authService.signUp(name,email, passsword).subscribe(
      resData => {
        console.log("resData", resData);
        this.router.navigate(['/login']);
     },
      error => {
        console.log("error", error);
    });
   // form.reset();
    
  }



  passwordConfirming(c: AbstractControl): { invalid: boolean } {
   // console.log("fomr value ", this.authForm);
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }
}
