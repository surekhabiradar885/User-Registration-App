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
      }),
     
    });
    this.authForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  // convenience getter for easy access to form fields
//  get f() { return this.form.controls; }

  onSubmit() {
  /*   if (!form.valid) {
      return;
    } */
    console.log("fomr value ", this.authForm);
/*     const email = form.value.email;
    const passsword = form.value.password;
    const name = form.value.name;
    this.authService.signUp(name,email, passsword).subscribe(
      resData => {
        console.log("resData", resData);
        this.router.navigate(['/login']);
     },
      error => {
        console.log("error", error);
    }); */
   // form.reset();
    
  }

 /*  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
   // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  } */
  
}
