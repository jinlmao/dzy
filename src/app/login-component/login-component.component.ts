import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit  {

  usersForm: FormGroup;
  userName: FormControl;
  passWord: FormControl;
  baseUrl = "http://127.0.0.1:8080/";
 
 

  isinvalid: boolean;
  isnoinvalid: boolean;

  name$!: Observable<String>;
  

  constructor(f: FormBuilder, private httpClient: HttpClient,private authService: AuthService,private router:Router) {
    this.usersForm = f.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    }
    )
    this.userName = <FormControl>this.usersForm.controls['userName'];
    this.passWord = <FormControl>this.usersForm.controls['passWord'];

    this.isinvalid = this.usersForm.controls['userName'].invalid;
    this.isnoinvalid = this.usersForm.controls['userName'].valid;

  }

  onSubmit(vlaue: any): void {
    console.log(vlaue);
    this.httpClient.post(this.baseUrl + 'login', vlaue).subscribe(
      (val: any) => {
        if (val.succ) {
          this.authService.Login();
          this.router.navigate(['/managment']);
        } else {
          alert('用户名或者密码错误！');
        }
      }
    )
  }
  ngOnInit(): void {
  
  }
}