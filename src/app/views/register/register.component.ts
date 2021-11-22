import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registerForm : FormGroup;
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
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      fullname: ['', Validators.required],
    });
    
  } 

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value,this.f.email.value,this.f.fullname.value)
      .subscribe((result) => {

        if (result.errorCode == "0") {
          this.error = '';
          alert("Đăng ký thành công vui lòng chờ quản trị viên xác nhận");
          // this.router.navigate(['/dashboard']);
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
