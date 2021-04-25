import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PAGES_PATH } from '../../../@core/constants/routes';
import { AuthService } from '../../../@core/services/auth.service';
import { ToastrService } from '../../../@core/services/toastr.service';
import { validateAllFormFields, validateEmail } from '../../../@core/validators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', Validators.required]
    })
  }

  get getForm() {
    return this.loginForm.controls;
  }

  login() {
    if(!this.loginForm.valid) {
      validateAllFormFields(this.loginForm)
      return
    }
    const { email, password } = this.loginForm.value
    this.authService.login(email, password).subscribe(user => {
      this.router.navigateByUrl(PAGES_PATH)
    }, err => {
      this.toastrService.showToast('bottom-right', 'danger', 'alert-circle-outline', err.error.message, "Login Error")
    })
  }

}
