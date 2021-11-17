import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm : FormGroup;
  loading = false;
  submitted = false;
  returnUrl : string = '';
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService : AuthenticationService,
    private router : Router,
    ) 
  {

  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  } 

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe((result) => {

        if (result.errorCode == "0") {
          this.error = '';
        
          this.router.navigate(['/dashboard']);
        }
        else {
          if (result.errorCode == "1") {
            alert("Không thành công, vui lòng kiểm tra kết nối đến server và thử lại.");
          }
          
          this.loading = false;
          this.error = result.errorMessage;
        }
      },
      (error) => {
        this.error = error["message"];
        this.loading = false;
        alert("Không thành công, vui lòng kiểm tra kết nối đến server và thử lại.");
      }, () => {
        this.loading = false;
      });

  }

  ngOnDestroy(): void {
    
  }
}
